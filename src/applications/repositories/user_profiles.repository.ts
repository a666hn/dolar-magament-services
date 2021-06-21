import { UserProfiles } from "src/infrastructures/database/postgres/entities/user_profiles.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(UserProfiles)
export class UserProfilesRepository extends Repository<UserProfiles> {}