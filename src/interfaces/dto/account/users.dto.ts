import { IsNotEmpty, IsString } from "class-validator";
import { Name } from "src/databases/entities/embeded/name.embeded";

export class UserRegistrationDto {
    @IsNotEmpty()
    name: Name;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class UserSignInDto {
    @IsNotEmpty({ message: 'Email is Required' })
    @IsString()
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @IsString()
    password: string;
}