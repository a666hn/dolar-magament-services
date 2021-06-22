import { SetMetadata } from '@nestjs/common';
import { RBAC_METADATA_KEY } from 'src/dictionaries/constant.dictionary';

export const RequiredRBAC = (...roles: number[]) =>
    SetMetadata(RBAC_METADATA_KEY, roles);
