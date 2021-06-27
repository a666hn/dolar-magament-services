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
import {
    BulkInsertCategoriesDto,
    CategoriesDataDto,
} from './dto/categories.dto';
import { ICategoriesData } from './interface/categories.interface';

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

    @UseGuards(JWTGuard, RBACGuard)
    @RequiredRBAC(
        RBAC_KEY_ID.SYSTEM_ADMINISTRATOR_GUARD,
        RBAC_KEY_ID.ADMINISTRATOR_GUARD,
    )
    @Post()
    @HttpCode(200)
    async InsertSingleCategories(
        @Body() categories: CategoriesDataDto,
        @GetAuthenticatedUser('id') id: string,
    ): Promise<DataResponse<ICategoriesData>> {
        const categoriesData =
            await this.categoriesUsecase.InsertSingleCategories(categories, id);

        return this.categoriesTransformer.transformSingleCategories(
            categoriesData,
        );
    }
}
