import { AccountModule } from './interfaces/rests/admin/account/account.module';
import { ProfileModule } from './interfaces/rests/admin/profiles/profile.module';
import { RolesModule } from './interfaces/rests/admin/roles/roles.module';

export const AdminPanelModule = [AccountModule, ProfileModule, RolesModule];
