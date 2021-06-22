import { DataResponse } from 'src/globals/global.interface';
import { MapUserRoleEntity } from 'src/infrastructures/database/postgres/entities/map-user-role.entity';
import { UsersEntity } from 'src/infrastructures/database/postgres/entities/users.entity';
import { LoginResponse } from './interface/authentication.interface';

export class AuthenticationTransformer {
    transformPayloadInformation(
        user: UsersEntity,
        roles: MapUserRoleEntity[],
        token: string,
        refreshToken: string,
    ): DataResponse<LoginResponse> {
        const newRoles = roles.map((rl) => rl?.role?.name);

        return {
            message: 'Login berhasil',
            data: {
                id: user?.id,
                user: {
                    name: user?.name,
                    username: user?.username,
                    email: user?.email,
                    phoneNumber: user?.profile?.phoneNumber,
                },
                meta: {
                    token,
                    refreshToken,
                },
                roles: newRoles,
            },
        };
    }
}
