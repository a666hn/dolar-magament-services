export interface IPayloadJwt {
    uid: string;
    email: string;
    isEmailVerified: boolean;
    username?: string;
}