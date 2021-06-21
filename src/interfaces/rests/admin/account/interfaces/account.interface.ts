export interface UserRegistrationDataResponse {
    id: string;
    name: string;
    username: string;
    email: string;
    profile: UserProfileData;
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
