import { Injectable } from '@nestjs/common';
import { BankService } from 'src/applications/services/bank.service';
import { BankEntity } from 'src/infrastructures/database/postgres/entities/bank.entity';
import { CreateBankDto } from 'src/interfaces/rests/finance/bank/dto/create-bank.dto';

@Injectable()
export class BankUsecase {
    constructor(private readonly bankService: BankService) {}

    async AddNewBank(bankDto: CreateBankDto): Promise<BankEntity> {
        return this.bankService.AddNewBank(bankDto);
    }
}
