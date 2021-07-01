import { ACCOUNT_STATUS } from 'src/globals/global.enum';
import { MapBankAccountEntity } from 'src/infrastructures/database/postgres/entities/map-bank-account.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(MapBankAccountEntity)
export class MapBankAccountRepository extends Repository<MapBankAccountEntity> {
    async findAndGetUserAndBankById(id: string): Promise<MapBankAccountEntity> {
        return this.findOne(id, {
            join: {
                alias: 'mapBankAccount',
                leftJoinAndSelect: {
                    user: 'mapBankAccount.user',
                    bank: 'mapBankAccount.bank',
                },
            },
        });
    }

    async findAllBanksByUser(uid: string): Promise<MapBankAccountEntity[]> {
        const query = this.createQueryBuilder('mba');

        query
            .leftJoinAndSelect('mba.user', 'user')
            .leftJoinAndSelect('mba.bank', 'bank')
            .andWhere('user.id = :uid', { uid })
            .andWhere('user.accountStatus IN (:...status)', {
                status: [ACCOUNT_STATUS.ACTIVE, ACCOUNT_STATUS.REGISTERED],
            });

        return query.getMany();
    }
}
