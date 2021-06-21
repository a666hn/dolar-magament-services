import { Injectable } from '@nestjs/common';
import { startCase, toLower } from 'lodash';
import { DataResponse } from 'src/globals/global.interface';
import { UsersEntity } from 'src/infrastructures/database/postgres/entities/users.entity';
import { ProfileResponse } from './interfaces/profile.interface';

@Injectable()
export class ProfileTransformer {
    transformUserProfile(user: UsersEntity): DataResponse<ProfileResponse> {
        return {
            message: 'Berhasil mendapatkan data user',
            data: {
                id: user?.id,
                name: startCase(toLower(user?.name)),
                profile: {
                    avatar: user?.profile?.avatar,
                    backgroundProfile: user?.profile?.backgroundProfile,
                    bio: user?.profile?.bio,
                    socialMedia: user?.profile?.socialMedia,
                },
                meta: {
                    email: user?.email,
                    username: user?.username,
                    status: user?.accountStatus,
                    isEmailVerified: user?.isEmailVerified,
                    phoneNumber: user?.profile?.phoneNumber,
                },
            },
        };
    }
}
