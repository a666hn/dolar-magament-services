import { MapUserRoleEntity } from 'src/infrastructures/database/postgres/entities/map-user-role.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(MapUserRoleEntity)
export class MapUserRoleRepository extends Repository<MapUserRoleEntity> {}
