import { DataResponse } from 'src/globals/global.interface';

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
}
