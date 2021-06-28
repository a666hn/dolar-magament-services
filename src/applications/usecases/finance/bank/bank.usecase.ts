import { Injectable } from '@nestjs/common';
import { BankService } from 'src/applications/services/bank.service';
import { MapBankAccountService } from 'src/applications/services/map-bank-account.service';
import { BankEntity } from 'src/infrastructures/database/postgres/entities/bank.entity';
import { MapBankAccountEntity } from 'src/infrastructures/database/postgres/entities/map-bank-account.entity';
import { CreateBankDto } from 'src/interfaces/rests/finance/bank/dto/create-bank.dto';
import { LinkedBankToAccountDto } from 'src/interfaces/rests/finance/bank/dto/linked-bank-to-account.dto';

@Injectable()
export class BankUsecase {
    constructor(
        private readonly bankService: BankService,
        private readonly mapBankAccountService: MapBankAccountService,
    ) {}

    async AddNewBank(bankDto: CreateBankDto): Promise<BankEntity> {
        return this.bankService.AddNewBank(bankDto);
    }

    async LinkedBankToAccount(
        linkBankToAccountDto: LinkedBankToAccountDto,
        uid: string,
    ): Promise<MapBankAccountEntity> {
        return this.mapBankAccountService.LinkedBankToAccount(
            linkBankToAccountDto,
            uid,
        );
    }
}
