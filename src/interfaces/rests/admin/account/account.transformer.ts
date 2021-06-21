import { DataResponse } from 'src/globals/global.interface';
import { UsersEntity } from 'src/infrastructures/database/postgres/entities/users.entities';
import { UserProfiles } from 'src/infrastructures/database/postgres/entities/user_profiles.entity';
import { UserRegistrationDataResponse } from './interfaces/account.interface';

export class AccountTransformers {
    transformSuccessRegistration(
        user: UsersEntity,
    ): DataResponse<UserRegistrationDataResponse> {
        return {
            message: 'Berhasil membuat user baru!',
            data: {
                id: user?.id,
                name: user?.name,
                email: user?.email,
                username: user?.username,
                profile: {
                    id: user?.profile?.id,
                    bio: user?.profile?.bio,
                    avatar: user?.profile?.avatar,
                    backgroundProfile: user?.profile?.backgroundProfile,
                    socialMedia: user?.profile?.socialMedia,
                    address: user?.profile?.address,
                    phoneNumber: user?.profile?.phoneNumber
                },
            },
        };
    }
}
