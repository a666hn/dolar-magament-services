import { UsersEntity } from 'src/databases/entities/users.entity';
import { UsersProfileEntity } from 'src/databases/entities/users_profile.entity';
import { DataResponse } from 'src/globals/global.interface';
import {
    AuthenticatedUserResponse,
    UserInterface,
} from '../interface/auth.interface';

export class AuthTransformers {
    transformResponseRegisterUser(
        user?: UsersEntity,
        profile?: UsersProfileEntity,
    ): DataResponse<UserInterface> {
        const userData: UserInterface = {
            uid: user?.id,
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            username: user?.username,
            status: user?.status,
            isEmailVerified: user?.isEmailVerified,
            profile: {
                profileId: profile?.id,
                avatar: profile?.avatar,
                backgroundProfile: profile?.background,
                accountStatus: profile?.accountStatus,
                bio: profile?.bio,
                socialMedia: profile?.socialMedia,
                address: profile?.address,
                version: profile?.version,
            },
            createdAt: user?.createdAt,
            updatedAt: user?.updatedAt,
            version: user?.version,
        };

        return {
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
