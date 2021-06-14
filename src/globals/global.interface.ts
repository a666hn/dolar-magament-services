export interface Header {
    authorization?: string;
    'x-platform'?: string;
    'x-user-id'?: string;
    'user-agent'?: string;
}

export interface DataResponse<T> {
    message?: string | 'Success';
    data: T;
}
