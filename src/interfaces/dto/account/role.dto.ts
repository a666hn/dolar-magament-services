import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class AddRoleDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description: string;
}

export class FilterRoleDto {
    @IsOptional()
    @IsUUID()
    id: string;

    @IsOptional()
    @IsString()
    name: string;
}
