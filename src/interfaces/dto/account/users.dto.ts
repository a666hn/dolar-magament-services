import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserRegistrationDto {
    @IsNotEmpty()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class UserProfileDto extends UserRegistrationDto {
    @IsOptional()
    @IsString()
    bio: string;

    @IsOptional()
    @IsString()
    address: string;
}

export class UserSignInDto {
    @IsNotEmpty({ message: 'Email is Required' })
    @IsString()
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @IsString()
    password: string;
}
