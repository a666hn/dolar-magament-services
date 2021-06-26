import { CategoriesEntity } from 'src/infrastructures/database/postgres/entities/categories.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(CategoriesEntity)
export class CategoriesRepository extends Repository<CategoriesEntity> {}
