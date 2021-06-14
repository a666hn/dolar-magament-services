import { ACCOUNT_PROFILE_STATUS } from 'src/globals/global.enum';

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

interface PictureInterface {
    url?: string | null;
    key?: string | null;
}

export interface UserInterface {
    uid: string;
    firstName: string;
    lastName?: string | null;
    email: string;
    username?: string | null;
    phoneNumber?: string | null;
    status: string;
    isEmailVerified: boolean;
    profile: UserProfileInterface;
    userRole?: string | null;
    permissions?: string[] | [];
    createdAt?: Date | string | null;
    updatedAt?: Date | string | null;
    version?: number | null;
}

export interface UserProfileInterface {
    profileId?: string | null;
    avatar: PictureInterface;
    backgroundProfile: PictureInterface;
    accountStatus?: ACCOUNT_PROFILE_STATUS | null;
    bio?: string | null;
    socialMedia?: string[] | [];
    address?: string | null;
    version?: number | null;
}
