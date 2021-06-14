import { AuthHandler } from './interfaces/handlers/account/auth/auth.handler';
import { ProfileHandler } from './interfaces/handlers/account/profile/profile.handler';
import { RoleHandler } from './interfaces/handlers/account/role/role.handler';
import { UserHandler } from './interfaces/handlers/account/user/user.handler';
import { PermissionHandler } from './interfaces/handlers/permissions/permission.handler';

export const AccountAPP = [
    AuthHandler,
    RoleHandler,
    UserHandler,
    ProfileHandler,
    PermissionHandler,
];
