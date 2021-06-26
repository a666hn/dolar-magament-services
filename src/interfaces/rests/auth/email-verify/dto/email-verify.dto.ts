import { IsNotEmpty, IsString } from 'class-validator';

export class EmailVerifyDto {
    // @IsNotEmpty()
    // @IsString()
    // id: string;

    @IsNotEmpty()
    @IsString()
    token: string;
}
