import { flatten, uniq } from 'lodash';
import { DataResponse } from 'src/globals/global.interface';
import { UsersEntity } from 'src/infrastructures/database/postgres/entities/users.entity';
import { LoginResponse } from './interface/authentication.interface';

export class AuthenticationTransformer {
    transformPayloadInformation(
        user: UsersEntity,
        token: string,
        refreshToken: string,
    ): DataResponse<LoginResponse> {
        const newRoles = user?.mapUserRoles?.map((rl) => rl?.role?.id);
        const permissions = uniq(
            flatten(
                user?.mapUserRoles?.map((mur) =>
                    mur?.role?.mapRolePermissions?.map(
                        (mrp) => mrp?.permission?.name,
                    ),
                ),
            ),
        );

        return {
            message: 'Login berhasil',
            data: {
                id: user?.id,
                info: {
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
                permissions: permissions,
            },
        };
    }
}
