export interface Header {
    authorization?: string;
    'x-platform'?: string;
    'x-user-id'?: string;
    'user-agent'?: string;
}

export interface DataResponse<T> {
    message?: string;
    data?: T;
}

export interface ID {
    id: string;
}

export interface Timestamps {
    createdAt: Date;
    updatedAt: Date;
}

export interface GetInformationOfAuthenticatedUserData {
    id: string;
    email: string;
    username: string;
    isEmailVerified: boolean;
    status: string;
    roles: number[];
}
