import { UserMetaEntity } from "src/infrastructures/database/postgres/entities/user_meta.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(UserMetaEntity)
export class UserMetaRepository extends Repository<UserMetaEntity> {}