import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankRepository } from 'src/applications/repositories/bank.repository';
import { MapBankAccountRepository } from 'src/applications/repositories/map-bank-account.repository';
import { BankController } from './bank.controller';
import { BankTransformer } from './bank.transformer';

@Module({
    imports: [
        TypeOrmModule.forFeature([BankRepository, MapBankAccountRepository]),
    ],
    controllers: [BankController],
    providers: [BankTransformer],
    exports: [TypeOrmModule],
})
export class BankModule {}
