import { DataResponse } from 'src/globals/global.interface';
import { UsersEntity } from 'src/infrastructures/database/postgres/entities/users.entity';
import { UserRegistrationDataResponse } from './interfaces/users.interface';

export class UsersTransformer {
    transformSuccessRegistration(
        user: UsersEntity,
    ): DataResponse<UserRegistrationDataResponse> {
        return {
            message: 'Berhasil membuat user baru!',
            data: {
                id: user?.id,
                name: user?.name,
                username: user?.username,
                profile: {
                    id: user?.profile?.id,
                    bio: user?.profile?.bio,
                    avatar: user?.profile?.avatar,
                    backgroundProfile: user?.profile?.backgroundProfile,
                    socialMedia: user?.profile?.socialMedia,
                    address: user?.profile?.address,
                    phoneNumber: user?.profile?.phoneNumber,
                },
                meta: {
                    isEmailVerified: user?.isEmailVerified,
                    status: user?.accountStatus,
                    userEmail: user?.email,
                },
            },
        };
    }
}
