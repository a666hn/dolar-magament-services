import { UsersEntity } from 'src/databases/entities/users.entity';
import { UsersProfileEntity } from 'src/databases/entities/users_profile.entity';
import { DataResponse } from 'src/globals/global.interface';
import {
    AuthenticatedUserResponse,
    UserInterface,
} from '../interface/auth.interface';

interface RequestDataTransformResponseRegistration {
    user?: UsersEntity;
    profile?: UsersProfileEntity;
}

export class AuthTransformers {
    transformResponseRegisterUser(
        completedMessage: string,
        data: RequestDataTransformResponseRegistration,
    ): DataResponse<UserInterface> {
        const userData: UserInterface = {
            uid: data?.user?.id,
            firstName: data?.user?.firstName,
            lastName: data?.user?.lastName,
            email: data?.user?.email,
            username: data?.user?.username,
            status: data?.user?.status,
            isEmailVerified: data?.user?.isEmailVerified,
            profile: {
                profileId: data?.profile?.id,
                avatar: data?.profile?.avatar,
                backgroundProfile: data?.profile?.background,
                accountStatus: data?.profile?.accountStatus,
                bio: data?.profile?.bio,
                socialMedia: data?.profile?.socialMedia,
                address: data?.profile?.address,
                version: data?.profile?.version,
            },
            createdAt: data?.user?.createdAt,
            updatedAt: data?.user?.updatedAt,
            version: data?.user?.version,
        };

        return {
            message: completedMessage,
            data: userData,
        };
    }

    transformResponseLoginUser(
        data: AuthenticatedUserResponse,
    ): DataResponse<AuthenticatedUserResponse> {
        const userPayload: AuthenticatedUserResponse = {
            token: data?.token,
            refreshToken: data?.refreshToken,
            role: data?.role,
            permissions: data?.permissions,
        };

        return {
            data: userPayload,
        };
    }
}
