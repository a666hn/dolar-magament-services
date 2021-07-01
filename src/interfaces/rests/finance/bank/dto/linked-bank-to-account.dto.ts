import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class LinkedBankToAccountDto {
    @IsNotEmpty()
    @IsNumber()
    bankId: number;

    @IsNotEmpty()
    @IsString()
    bankNumber: string;

    @IsNotEmpty()
    @IsString()
    accountName: string;

    @IsOptional()
    @IsBoolean()
    isDefault: boolean;
}
