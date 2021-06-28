import { DataResponse } from 'src/globals/global.interface';
import { BankEntity } from 'src/infrastructures/database/postgres/entities/bank.entity';
import { IBankData } from './interface/bank.interface';

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
}
