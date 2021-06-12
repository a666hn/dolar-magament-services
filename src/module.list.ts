import { AuthHandler } from "./interfaces/handlers/account/auth/auth.handler";
import { RoleHandler } from "./interfaces/handlers/account/role/role.handler";

export const AccountAPP = [
    // AUTH
    AuthHandler,

    // ROLE
    RoleHandler
]