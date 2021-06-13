import { UsersProfileEntity } from "src/databases/entities/users_profile.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(UsersProfileEntity)
export class UserProfileRepository extends Repository<UsersProfileEntity> {}