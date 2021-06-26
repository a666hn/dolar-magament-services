import { Injectable } from '@nestjs/common';
import { CategoriesService } from 'src/applications/services/categories.service';
import { BulkInsertCategoriesDto } from 'src/interfaces/rests/public/categories/dto/categories.dto';

@Injectable()
export class CategoriesUsecase {
    constructor(private readonly categoriesService: CategoriesService) {}

    async BulkInsertCategories(
        bulk: BulkInsertCategoriesDto,
        userId: string,
    ): Promise<[number, string[]]> {
        return this.categoriesService.BulkInsertCategories(bulk, userId);
    }
}
