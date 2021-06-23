import { MapRolePermissionsEntity } from 'src/infrastructures/database/postgres/entities/map-role-permissions.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(MapRolePermissionsEntity)
export class MapRolePermissionsRepository extends Repository<MapRolePermissionsEntity> {}
