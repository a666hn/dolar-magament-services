import { DataResponse } from 'src/globals/global.interface';
import { CategoriesEntity } from 'src/infrastructures/database/postgres/entities/categories.entity';
import { ICategoriesData } from './interface/categories.interface';

export class CategoriesTransformer {
    transformBulkInsert(
        affectedRow: number,
        categories: string[],
        countData: number,
    ): DataResponse<any> {
        return {
            message: `Berhasil membuat ${affectedRow}/${countData} kategori`,
            data: categories,
        };
    }

    transformSingleCategories(
        categories: CategoriesEntity,
    ): DataResponse<ICategoriesData> {
        return {
            message: 'Berhasil menambahkan category baru',
            data: {
                name: categories?.name,
                description: categories?.description,
                createdAt: categories?.createdAt,
                createdBy: categories?.createdBy,
            },
        };
    }

    transformGetCategories(
        cat: CategoriesEntity[],
    ): DataResponse<ICategoriesData[]> {
        const newData: ICategoriesData[] = cat.map((c: CategoriesEntity) => ({
            name: c.name,
            description: c.description,
            createdAt: c.createdAt,
            createdBy: c.createdBy,
        }));

        return {
            message: `Mendapatkan ${cat.length} categories`,
            data: newData,
        };
    }
}
