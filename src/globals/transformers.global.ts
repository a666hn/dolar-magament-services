import { flatten, uniq } from 'lodash';
import { GetInformationOfAuthenticatedUserData } from './global.interface';

export class TransformersGlobal {
    transformUserCredentials(
        payload: any,
    ): GetInformationOfAuthenticatedUserData {
        let roles = payload?.mapUserRoles?.map((mur: any) => mur.role?.id);
        let permissions = uniq(
            flatten(
                payload?.mapUserRoles?.map((mur: any) =>
                    mur?.role?.mapRolePermissions?.map(
                        (mrp: any) => mrp?.permission?.name,
                    ),
                ),
            ),
        );

        roles = roles.sort((a: number, b: number) => a - b);
        permissions = permissions.sort((a: any, b: any) => a - b);

        return {
            id: payload?.id,
            username: payload?.username,
            email: payload?.email,
            isEmailVerified: payload?.isEmailVerified,
            status: payload?.accountStatus,
            roles: roles,
            permissions: permissions,
        };
    }
}
