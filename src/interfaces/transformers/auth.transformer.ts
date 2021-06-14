import { UsersEntity } from 'src/databases/entities/users.entity';
import { UsersProfileEntity } from 'src/databases/entities/users_profile.entity';
import { DataResponse } from 'src/globals/global.interface';
import { UserInterface } from '../interface/auth.interface';

export class AuthTransformers {
    transformResponseRegisterUser(
        user?: UsersEntity,
        profile?: UsersProfileEntity,
        role?: string | 'Unknown',
        permissions?: string[],
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
            userRole: role,
            permissions: permissions,
            createdAt: user?.createdAt,
            updatedAt: user?.updatedAt,
            version: user?.version,
        };

        return {
            data: userData,
        };
    }
}
