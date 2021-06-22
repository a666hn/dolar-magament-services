import { ProfileModule } from './interfaces/rests/admin/profiles/profile.module';
import { RolesModule } from './interfaces/rests/admin/roles/roles.module';
import { UsersModule } from './interfaces/rests/admin/users/users.module';

export const AdminPanelModule = [UsersModule, ProfileModule, RolesModule];
