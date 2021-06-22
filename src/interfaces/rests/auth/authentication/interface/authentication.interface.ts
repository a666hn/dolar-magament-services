import { ID } from 'src/globals/global.interface';

export interface LoginResponse extends ID {
    user: UserData;
    meta: MetaLogin;
    roles: string[];
}

interface UserData {
    name: string;
    username: string;
    email: string;
    phoneNumber: string;
}

interface MetaLogin {
    isEmailVerified: boolean;
    status: string;
    token: string;
    refreshToken: string;
}
