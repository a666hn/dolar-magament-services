import { InternalServerErrorException } from '@nestjs/common';
import { CategoriesEntity } from 'src/infrastructures/database/postgres/entities/categories.entity';
import { BulkInsertCategoriesDto } from 'src/interfaces/rests/public/categories/dto/categories.dto';
import { HandlePostgressError } from 'src/utils/postgress-handle-error';
import { EntityRepository, getConnection, Repository } from 'typeorm';

@EntityRepository(CategoriesEntity)
export class CategoriesRepository extends Repository<CategoriesEntity> {
    private readonly connection = getConnection();

    async BulkInsertCategories(
        bulk: BulkInsertCategoriesDto,
        userId: string,
    ): Promise<[number, string[]]> {
        if (!userId) {
            throw new InternalServerErrorException('User tidak diketahui');
        }

        const { bulkData } = bulk;
        const queryRunner = this.connection.createQueryRunner();

        queryRunner.connect();

        const bd = bulkData.map((bd) => ({ ...bd, createdBy: userId }));
        const categories = this.create(bd);

        await queryRunner.startTransaction();

        try {
            await this.save(categories);

            await queryRunner.commitTransaction();

            return [categories.length, categories.map((c) => c.name)];
        } catch (err) {
            await queryRunner.rollbackTransaction();

            HandlePostgressError(err.code, err.message);
        } finally {
            await queryRunner.release();
        }
    }
}
