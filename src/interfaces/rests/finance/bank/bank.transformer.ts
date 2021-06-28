import { DataResponse } from 'src/globals/global.interface';
import { BankEntity } from 'src/infrastructures/database/postgres/entities/bank.entity';
import { MapBankAccountEntity } from 'src/infrastructures/database/postgres/entities/map-bank-account.entity';
import { IBankData, IMapBankAccountData } from './interface/bank.interface';

export class BankTransformer {
    transformAddNewbank(bank: BankEntity): DataResponse<IBankData> {
        return {
            message: 'Berhasil menambahkan bank baru',
            data: {
                id: bank?.id,
                code: bank?.bankCode,
                name: bank?.bankName,
                description: bank?.description,
                createdAt: bank?.createdAt,
            },
        };
    }

    transformMapBankAccount(
        mapBankAccount: MapBankAccountEntity,
    ): DataResponse<IMapBankAccountData> {
        return {
            message: 'Berhasil menautkan bank baru ke account anda',
            data: {
                id: mapBankAccount?.id,
                accountName: mapBankAccount?.accountName,
                bankNumber: mapBankAccount?.bankNumber,
                isDefault: mapBankAccount?.isDefault,
                account: {
                    id: mapBankAccount?.user?.id,
                    name: mapBankAccount?.user?.name,
                    username: mapBankAccount?.user.username,
                    email: mapBankAccount?.user?.email,
                    isEmailVerified: mapBankAccount?.user?.isEmailVerified,
                    accountStatus: mapBankAccount?.user?.accountStatus,
                },
                bank: {
                    id: mapBankAccount?.bank?.id,
                    code: mapBankAccount?.bank?.bankCode,
                    name: mapBankAccount?.bank?.bankName,
                    description: mapBankAccount?.bank?.description,
                    createdAt: mapBankAccount?.bank?.createdAt,
                },
                createdAt: mapBankAccount?.createdAt,
                updatedAt: mapBankAccount?.updatedAt,
            },
        };
    }
}
