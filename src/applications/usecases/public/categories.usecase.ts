import { Injectable } from '@nestjs/common';
import { CategoriesService } from 'src/applications/services/categories.service';
import { CategoriesEntity } from 'src/infrastructures/database/postgres/entities/categories.entity';
import {
    BulkInsertCategoriesDto,
    CategoriesDataDto,
    CategoriesFilterQueryDto,
} from 'src/interfaces/rests/public/categories/dto/categories.dto';

@Injectable()
export class CategoriesUsecase {
    constructor(private readonly categoriesService: CategoriesService) {}

    async BulkInsertCategories(
        bulk: BulkInsertCategoriesDto,
        userId: string,
    ): Promise<[number, string[]]> {
        return this.categoriesService.BulkInsertCategories(bulk, userId);
    }

    async InsertSingleCategories(
        categoriesDto: CategoriesDataDto,
        userId: string,
    ): Promise<CategoriesEntity> {
        return this.categoriesService.InsertSingleCategories(
            categoriesDto,
            userId,
        );
    }

    async GetCategories(
        filterCategories: CategoriesFilterQueryDto,
    ): Promise<CategoriesEntity[]> {
        return this.categoriesService.GetCategories(filterCategories);
    }
}
