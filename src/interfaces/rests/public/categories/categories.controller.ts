import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CategoriesUsecase } from 'src/applications/usecases/public/categories.usecase';
import {
    CATEGORIES_URL,
    RBAC_KEY_ID,
    UPLOAD_BULK_CATEGORIES_URL,
    VERSION_1,
} from 'src/dictionaries/constant.dictionary';
import { DataResponse } from 'src/globals/global.interface';
import { GetAuthenticatedUser } from 'src/guards/decorators/user-authenticated.decorator';
import { JWTGuard } from 'src/guards/jwt.guard';
import { RBACGuard } from 'src/guards/rbac.guard';
import { RequiredRBAC } from 'src/guards/rbac.metadata';
import { CategoriesTransformer } from './categories.transformer';
import { BulkInsertCategoriesDto } from './dto/categories.dto';

@Controller(`/${VERSION_1}/${CATEGORIES_URL}`)
export class CategoriesController {
    constructor(
        private readonly categoriesTransformer: CategoriesTransformer,
        private readonly categoriesUsecase: CategoriesUsecase,
    ) {}

    @UseGuards(JWTGuard, RBACGuard)
    @RequiredRBAC(
        RBAC_KEY_ID.SYSTEM_ADMINISTRATOR_GUARD,
        RBAC_KEY_ID.ADMINISTRATOR_GUARD,
    )
    @Post(UPLOAD_BULK_CATEGORIES_URL)
    @HttpCode(200)
    async BulkInsertCategories(
        @Body() bulk: BulkInsertCategoriesDto,
        @GetAuthenticatedUser('id') userId: string,
    ): Promise<DataResponse<any>> {
        const { bulkData } = bulk;
        const [affectedRow, categories] =
            await this.categoriesUsecase.BulkInsertCategories(bulk, userId);
        return this.categoriesTransformer.transformBulkInsert(
            affectedRow,
            categories,
            bulkData.length,
        );
    }
}
