import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BulkInsertCategoriesDto } from 'src/interfaces/rests/public/categories/dto/categories.dto';
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
}
