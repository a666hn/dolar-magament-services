import { UserProfilesEntity } from "src/infrastructures/database/postgres/entities/user_profiles.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(UserProfilesEntity)
export class UserProfilesRepository extends Repository<UserProfilesEntity> {}