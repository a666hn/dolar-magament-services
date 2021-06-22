import { GetInformationOfAuthenticatedUserData } from './global.interface';

export class TransformersGlobal {
    transformUserCredentials(
        payload: any,
    ): GetInformationOfAuthenticatedUserData {
        return {
            id: payload?.id,
            username: payload?.username,
            email: payload?.email,
            isEmailVerified: payload?.isEmailVerified,
            status: payload?.accountStatus,
            roles: payload?.roles,
        };
    }
}
