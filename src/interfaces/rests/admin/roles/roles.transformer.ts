import { Injectable } from '@nestjs/common';
import { DataResponse } from 'src/globals/global.interface';
import { RolesEntity } from 'src/infrastructures/database/postgres/entities/roles.entity';
import { RoleResponse } from './interface/roles.interface';

@Injectable()
export class RolesTransformers {
    transformAllRoles(role: RolesEntity[]): DataResponse<RoleResponse> {
        const newData = role.map((r) => ({
            label: r.name,
            value: r.id,
        }));

        return {
            message: 'Success mendapatkan semua data role',
            data: {
                roles: newData,
            },
        };
    }

    transformAssignRoleToUser(message: string): DataResponse<string> {
        return {
            message,
        };
    }
}
