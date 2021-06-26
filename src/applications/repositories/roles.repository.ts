import { RolesEntity } from 'src/infrastructures/database/postgres/entities/roles.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RolesEntity)
export class RolesRepository extends Repository<RolesEntity> {}
