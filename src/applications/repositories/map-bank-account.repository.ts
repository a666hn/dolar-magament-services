import { MapBankAccountEntity } from 'src/infrastructures/database/postgres/entities/map-bank-account.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(MapBankAccountEntity)
export class MapBankAccountRepository extends Repository<MapBankAccountEntity> {
    async findAndGetUserAndBankById(id: string): Promise<MapBankAccountEntity> {
        return this.findOne(id, {
            join: {
                alias: 'mapBankAccount',
                leftJoinAndSelect: {
                    user: 'mapBankAccount.user',
                    bank: 'mapBankAccount.bank',
                },
            },
        });
    }
}
