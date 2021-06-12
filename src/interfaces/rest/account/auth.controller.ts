import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from "@nestjs/common";
import { UsersEntity } from "src/databases/entities/users.entity";
import { UserRegistrationDto } from "src/interfaces/dto/account/users.dto";
import { AuthUsecase } from "src/interfaces/usecases/account/auth.usecase";

@Controller('authentication')
export class AuthController {
    constructor(private aUsecase: AuthUsecase) {}

    @Post('signin')
    @UseInterceptors(ClassSerializerInterceptor)
    RegisterUser(@Body() uDto: UserRegistrationDto): Promise<UsersEntity> {
        return this.aUsecase.RegisterUser(uDto);
    }
}