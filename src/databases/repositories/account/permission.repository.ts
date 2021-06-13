import { PermissionsEntity } from "src/databases/entities/permissions.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(PermissionsEntity)
export class PermissionRepository extends Repository<PermissionsEntity> {}