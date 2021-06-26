import { PermissionsEntity } from 'src/infrastructures/database/postgres/entities/permissions.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PermissionsEntity)
export class PermissionsRepository extends Repository<PermissionsEntity> {}
