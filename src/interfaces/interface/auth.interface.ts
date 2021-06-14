export interface IPayloadJwt {
    uid: string;
    email: string;
    isEmailVerified: boolean;
    username?: string;
}

export interface ISignInResponse<T> {
    role?: string;
    permissions?: string[];
    token?: string;
    refreshToken?: string;
    userData?: T;
}

export interface IAuthenticatedUserPayload {
    uid: string;
    firstname: string;
    lastname?: string;
    fullname: string;
    username?: string;
    email: string;
    isEmailVerified: boolean;
    phonenumber?: string;
    role?: string;
}