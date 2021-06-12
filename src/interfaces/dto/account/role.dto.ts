import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AddRoleDto {
    @IsNotEmpty()
    @IsString()
    roleName: string;

    @IsOptional()
    @IsString()
    description: string;
}