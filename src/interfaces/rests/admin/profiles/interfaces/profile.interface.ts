import { ID } from 'src/globals/global.interface';

export interface ProfileResponse extends ID {
    name: string;
    profile: ProfileData;
    meta: ProfileMeta;
}

interface Picture {
    key?: string;
    url?: string;
}

interface ProfileData {
    avatar: Picture;
    backgroundProfile: Picture;
    bio: string;
    socialMedia: string[];
}

interface ProfileMeta {
    isEmailVerified: boolean;
    email: string;
    username: string;
    status: string,
    phoneNumber: string;
}