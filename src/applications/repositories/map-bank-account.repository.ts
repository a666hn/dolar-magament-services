import { MapBankAccountEntity } from 'src/infrastructures/database/postgres/entities/map-bank-account.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(MapBankAccountEntity)
export class MapBankAccountRepository extends Repository<MapBankAccountEntity> {}
