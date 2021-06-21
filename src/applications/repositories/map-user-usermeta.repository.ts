import { MapUserUserMetaEntity } from "src/infrastructures/database/postgres/entities/map-user-usermeta.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(MapUserUserMetaEntity)
export class MapUserUserMetaRepository extends Repository<MapUserUserMetaEntity> {}