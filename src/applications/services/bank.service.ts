import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBankDto } from 'src/interfaces/rests/finance/bank/dto/create-bank.dto';
import { HandlePostgressError } from 'src/utils/postgress-handle-error';
import { BankEntity } from 'src/infrastructures/database/postgres/entities/bank.entity';
import { BankRepository } from '../repositories/bank.repository';

@Injectable()
export class BankService {
    constructor(
        @InjectRepository(BankRepository)
        private readonly bankRepository: BankRepository,
    ) {}

    async AddNewBank(bankDto: CreateBankDto): Promise<BankEntity> {
        const { name, description } = bankDto;
        const bank = this.bankRepository.create({
            bankName: name,
            description,
        });

        try {
            await this.bankRepository.save(bank);

            return bank;
        } catch (err) {
            HandlePostgressError(err.code, err.message);
        }
    }
}
