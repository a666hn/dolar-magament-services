import { Type } from 'class-transformer';
import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
    ValidateNested,
} from 'class-validator';

export class BulkInsertCategoriesDto {
    @IsArray({ message: 'Bulk data harus dalam bentuk array' })
    @ValidateNested({
        each: true,
        message: (props) => {
            console.log('targetName', props.targetName);
            return 'Salah cuy';
        },
    })
    @ArrayMinSize(1, { message: 'Bulk data harus memiliki minimal 1 data' })
    @ArrayMaxSize(2, { message: 'Bulk data maksimal memiliki 10 data' })
    @Type(() => CategoriesData)
    bulkData: CategoriesData[];
}

export class CategoriesData {
    @IsNotEmpty({ message: 'Nama kategori dibutuhkan' })
    @IsString()
    @MinLength(3, {
        message:
            'Harap masukkan nama kategori minimal $constraint1 karakter, tapi hanya mendapatkan "$value" karakter',
    })
    @MaxLength(25, {
        message: (props) => {
            console.log('Props:', props);
            return 'Nama kategori melebihi dari panjang karakter yang di perbolehkan. Maksimal karakter yang diperbolehkan adalah $constraint1 karakter';
        },
    })
    name: string;

    @IsOptional()
    @IsString()
    description: string;
}
