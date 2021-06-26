import { ProfileModule } from './interfaces/rests/admin/profiles/profile.module';
import { RBACModule } from './interfaces/rests/admin/rbac/rbac.module';
import { UsersModule } from './interfaces/rests/admin/users/users.module';
import { VerifyEmailModule } from './interfaces/rests/auth/email-verify/email-verify.module';

export const AdminPanelModule = [
    UsersModule,
    ProfileModule,
    RBACModule,
    VerifyEmailModule,
];
