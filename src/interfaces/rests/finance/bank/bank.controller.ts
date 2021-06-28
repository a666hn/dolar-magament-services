import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { BankUsecase } from 'src/applications/usecases/finance/bank/bank.usecase';
import {
    BANK_LIST_URL,
    BANK_URL,
    LINKED_BANK_TO_ACCOUNT_URL,
    RBAC_KEY_ID,
    VERSION_1,
} from 'src/dictionaries/constant.dictionary';
import { DataResponse } from 'src/globals/global.interface';
import { GetAuthenticatedUser } from 'src/guards/decorators/user-authenticated.decorator';
import { JWTGuard } from 'src/guards/jwt.guard';
import { RBACGuard } from 'src/guards/rbac.guard';
import { RequiredRBAC } from 'src/guards/rbac.metadata';
import { BankTransformer } from './bank.transformer';
import { CreateBankDto } from './dto/create-bank.dto';
import { LinkedBankToAccountDto } from './dto/linked-bank-to-account.dto';
import { IBankData } from './interface/bank.interface';

@Controller(`/${VERSION_1}/${BANK_URL}`)
export class BankController {
    constructor(
        private readonly bankUsecase: BankUsecase,
        private readonly bankTransformer: BankTransformer,
    ) {}

    @UseGuards(JWTGuard, RBACGuard)
    @RequiredRBAC(
        RBAC_KEY_ID.SYSTEM_ADMINISTRATOR_GUARD,
        RBAC_KEY_ID.ADMINISTRATOR_GUARD,
    )
    @Post(BANK_LIST_URL)
    async AddNewBank(
        @Body() createBankDto: CreateBankDto,
    ): Promise<DataResponse<IBankData>> {
        const bank = await this.bankUsecase.AddNewBank(createBankDto);

        return this.bankTransformer.transformAddNewbank(bank);
    }

    @UseGuards(JWTGuard, RBACGuard)
    @RequiredRBAC(
        RBAC_KEY_ID.SYSTEM_ADMINISTRATOR_GUARD,
        RBAC_KEY_ID.ADMINISTRATOR_GUARD,
    )
    @HttpCode(200)
    @Post(LINKED_BANK_TO_ACCOUNT_URL)
    async LinkedBankToAccount(
        @Body() linkBankToAccountDto: LinkedBankToAccountDto,
        @GetAuthenticatedUser('id') uid: string,
    ): Promise<DataResponse<any>> {
        const mapBankAccount = await this.bankUsecase.LinkedBankToAccount(
            linkBankToAccountDto,
            uid,
        );

        return this.bankTransformer.transformMapBankAccount(mapBankAccount);
    }
}
