// Application Variable!
export const APP_NAME = 'dollar-management';

// Environment Variable!
export const HOST = 'DATABASE_HOST_ACCOUNT';
export const PORT = 'DATABASE_PORT_ACCOUNT';
export const USERNAME = 'DATABASE_USER_ACCOUNT';
export const PASSWORD = 'DATABASE_PASSWORD_ACCOUNT';
export const NAME = 'DATABASE_NAME_ACCOUNT';

export const SERVICE = 'api';

// Roles Key
export const RBAC_METADATA_KEY = 'AUTH_BASE_RBAC';

// RBAC
export const RBAC_KEY_ID = {
    SYSTEM_ADMINISTRATOR_GUARD: 1,
    ADMINISTRATOR: 2,
};

// Version Variable!
export const VERSION_1 = 'v1';
export const VERSION_2 = 'v2';
export const VERSION_3 = 'v3';

// Entities Variable!
export const USER_ENTITY = 'users';
export const USER_PROFILE_ENTITY = 'user_profiles';
export const ROLE_ENTITY = 'roles';
export const PERMISSION_ENTITY = 'permissions';
export const MAP_USER_ROLE_ENTITY = 'map_user_role';
export const MAP_ROLE_PERMISSIONS_ENTITY = 'map_role_permission';

// URL Variables!
export const ACCOUNT_URL = 'account';
export const ACCOUNT_SIGNUP_URL = 'signup';
export const ACCOUNT_SIGNIN_URL = 'signin';

export const PROFILE_URL = 'profile';

export const ROLES_URL = 'role';
export const ROLES_GET_ALL_URL = 'all';
export const ROLES_ASSIGN_USER_URL = 'assign-role';

export const EMAIL_URL = 'email';
export const CONFIRMATION_EMAIL_URL = 'confirmation';

// Queue Variable
export const BULL_QUEUE_NAME = 'mail_queue';

export const CONFIRMATION_REGISTRATION_EMAIL_QUEUE =
    'confirmation_registration_email_user';
