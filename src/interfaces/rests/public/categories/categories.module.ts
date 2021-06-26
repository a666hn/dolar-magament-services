import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesRepository } from 'src/applications/repositories/categories.repository';
import { CategoriesController } from './categories.controller';
import { CategoriesTransformer } from './categories.transformer';

@Module({
    imports: [TypeOrmModule.forFeature([CategoriesRepository])],
    controllers: [CategoriesController],
    providers: [
        // Transformers
        CategoriesTransformer,
    ],
    exports: [TypeOrmModule],
})
export class CategoriesModule {}
