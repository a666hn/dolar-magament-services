import { ID } from 'src/globals/global.interface';

export interface IBankData {
    id: number;
    code: string;
    name: string;
    description: string;
    createdAt: Date;
}

export interface IMapBankAccountData extends ID {
    accountName: string;
    bankNumber: string;
    isDefault: boolean;
    account: IAccount;
    bank: IBankData;
    createdAt: Date;
    updatedAt: Date;
}

interface IAccount extends ID {
    name: string;
    email: string;
    username: string;
    isEmailVerified: boolean;
    accountStatus: string;
}
