import { UsersEntity } from "src/databases/entities/users.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(UsersEntity)
export class UserRepository extends Repository<UsersEntity> {}