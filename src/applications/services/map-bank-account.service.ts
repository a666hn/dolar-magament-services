import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MapBankAccountEntity } from 'src/infrastructures/database/postgres/entities/map-bank-account.entity';
import { LinkedBankToAccountDto } from 'src/interfaces/rests/finance/bank/dto/linked-bank-to-account.dto';
import { HandlePostgressError } from 'src/utils/postgress-handle-error';
import { getConnection } from 'typeorm';
import { MapBankAccountRepository } from '../repositories/map-bank-account.repository';

@Injectable()
export class MapBankAccountService {
    private readonly connection = getConnection();

    constructor(
        @InjectRepository(MapBankAccountRepository)
        private readonly mapBankAccountRepository: MapBankAccountRepository,
    ) {}

    async LinkedBankToAccount(
        linkBankToAccountDto: LinkedBankToAccountDto,
        userId: string,
    ): Promise<MapBankAccountEntity> {
        const queryRunner = this.connection.createQueryRunner();
        const { bankId, bankNumber, accountName, isDefault } =
            linkBankToAccountDto;
        const defaultBank = isDefault ? true : false;

        queryRunner.connect();

        const mapBankToAccount = this.mapBankAccountRepository.create({
            bankId,
            bankNumber,
            accountName,
            userId,
            isDefault: defaultBank,
        });

        await queryRunner.startTransaction();

        try {
            if (defaultBank) {
                await this.checkAndChangeDefaultBankAccount(userId);
            }

            await this.mapBankAccountRepository.save(mapBankToAccount);

            const mapBankToAccountWithUserAndBank =
                await this.mapBankAccountRepository.findAndGetUserAndBankById(
                    mapBankToAccount.id,
                );

            await queryRunner.commitTransaction();

            return mapBankToAccountWithUserAndBank;
        } catch (err) {
            HandlePostgressError(err.code, err.message);
            queryRunner.rollbackTransaction();
        } finally {
            queryRunner.release();
        }
    }

    private async checkAndChangeDefaultBankAccount(
        userId: string,
    ): Promise<void> {
        const mapBankToAccounts = await this.mapBankAccountRepository.find({
            where: {
                userId,
            },
            select: ['id', 'userId', 'isDefault'],
        });

        const indexBankDefault = mapBankToAccounts.findIndex(
            (mbta: MapBankAccountEntity) => mbta.isDefault === true,
        );

        if (indexBankDefault > -1) {
            const id = mapBankToAccounts[indexBankDefault].id;
            const mbta = await this.mapBankAccountRepository.findOne(id);

            mbta.isDefault = false;

            await this.mapBankAccountRepository.save(mbta);
        }
    }
}
