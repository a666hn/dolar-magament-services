import { IsNotEmpty } from "class-validator";
import { Name } from "src/databases/entities/embeded/name.embeded";

export class UserRegistrationDto {
    @IsNotEmpty()
    name: Name;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}