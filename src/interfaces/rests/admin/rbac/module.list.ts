import { forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapRolePermissionsRepository } from 'src/applications/repositories/map-role-permissions.repository';
import { MapUserRoleRepository } from 'src/applications/repositories/map-user-role.repository';
import { PermissionsRepository } from 'src/applications/repositories/permissions.repository';
import { RolesRepository } from 'src/applications/repositories/roles.repository';
import { AuthenticationModule } from '../../auth/authentication/authentication.module';
import { UsersModule } from '../users/users.module';

export const ModuleNeedForRBAC = [
    AuthenticationModule,
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([
        RolesRepository,
        MapUserRoleRepository,
        PermissionsRepository,
        MapRolePermissionsRepository,
    ]),
];
