import { UsersEntity } from 'src/infrastructures/database/postgres/entities/users.entities';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UsersEntity)
export class AccountRepository extends Repository<UsersEntity> {}
