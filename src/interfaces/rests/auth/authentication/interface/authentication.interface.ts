import { ID } from 'src/globals/global.interface';

export interface LoginResponse extends ID {
    info: UserData;
    meta: MetaLogin;
    roles: number[];
    permissions: string[];
}

interface UserData {
    name: string;
    username: string;
    email: string;
    phoneNumber: string;
}

interface MetaLogin {
    token: string;
    refreshToken: string;
}
