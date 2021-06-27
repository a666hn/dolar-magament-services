import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesEntity } from 'src/infrastructures/database/postgres/entities/categories.entity';
import {
    BulkInsertCategoriesDto,
    CategoriesDataDto,
    CategoriesFilterQueryDto,
} from 'src/interfaces/rests/public/categories/dto/categories.dto';
import { HandlePostgressError } from 'src/utils/postgress-handle-error';
import { CategoriesRepository } from '../repositories/categories.repository';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(CategoriesRepository)
        private readonly categoriesRepository: CategoriesRepository,
    ) {}

    async BulkInsertCategories(
        bulk: BulkInsertCategoriesDto,
        userId: string,
    ): Promise<[number, string[]]> {
        return this.categoriesRepository.BulkInsertCategories(bulk, userId);
    }

    async InsertSingleCategories(
        categoriesDto: CategoriesDataDto,
        userId: string,
    ): Promise<CategoriesEntity> {
        const { name, description } = categoriesDto;
        const categories = this.categoriesRepository.create({
            name,
            description,
            createdBy: userId,
        });

        try {
            await this.categoriesRepository.save(categories);
            return categories;
        } catch (err) {
            HandlePostgressError(err.code, err.message);
        }
    }

    async GetCategories(
        filterCategories: CategoriesFilterQueryDto,
    ): Promise<CategoriesEntity[]> {
        const { name } = filterCategories;

        const query = this.categoriesRepository.createQueryBuilder('cat');

        if (name) {
            query.andWhere('cat.name ILIKE :name ', { name: `%${name}%` });
        }

        return query.getMany();
    }
}
