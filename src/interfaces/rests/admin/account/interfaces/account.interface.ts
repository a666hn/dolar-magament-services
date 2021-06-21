export interface UserRegistrationDataResponse {
    id: string;
    name: string;
    username: string;
    profile: UserProfileData;
    meta: UserMeta;
}

interface Picture {
    key?: string;
    url?: string;
}

interface UserProfileData {
    id: string;
    bio: string;
    socialMedia: string[];
    avatar: Picture;
    backgroundProfile: Picture;
    phoneNumber: string;
    address: string;
}

interface UserMeta {
    userEmail: string;
    isEmailVerified: boolean;
    status: string;
}
