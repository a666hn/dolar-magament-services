import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesRepository } from 'src/applications/repositories/categories.repository';
import { CategoriesService } from 'src/applications/services/categories.service';
import { CategoriesUsecase } from 'src/applications/usecases/public/categories.usecase';
import { CategoriesController } from './categories.controller';
import { CategoriesTransformer } from './categories.transformer';

@Module({
    imports: [TypeOrmModule.forFeature([CategoriesRepository])],
    controllers: [CategoriesController],
    providers: [
        // Service
        CategoriesService,

        // Usecase
        CategoriesUsecase,

        // Transformers
        CategoriesTransformer,
    ],
    exports: [TypeOrmModule],
})
export class CategoriesModule {}
