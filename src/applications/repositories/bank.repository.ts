import { BankEntity } from 'src/infrastructures/database/postgres/entities/bank.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(BankEntity)
export class BankRepository extends Repository<BankEntity> {}
