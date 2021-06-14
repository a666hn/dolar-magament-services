import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetAuthenticatedUser } from "src/core/decorator/user.decorator";
import { UsersEntity } from "src/databases/entities/users.entity";
import { UserRegistrationDto, UserSignInDto } from "src/interfaces/dto/account/users.dto";
import { IAuthenticatedUserPayload, ISignInResponse } from "src/interfaces/interface/auth.interface";
import { AuthUsecase } from "src/interfaces/usecases/account/auth.usecase";

@Controller('authentication')
export class AuthController {
    constructor(private aUsecase: AuthUsecase) {}

    @Post('registration')
    @UseInterceptors(ClassSerializerInterceptor)
    RegisterUser(@Body() uDto: UserRegistrationDto): Promise<UsersEntity> {
        return this.aUsecase.RegisterUser(uDto);
    }

    @HttpCode(200)
    @Post('signin')
    @UseInterceptors(ClassSerializerInterceptor)
    UserSignIn(@Body() userSignInDto: UserSignInDto): Promise<ISignInResponse<UsersEntity>> {
        return this.aUsecase.UserSignIn(userSignInDto);
    }

    @Get('/test')
    @UseGuards(AuthGuard())
    Test(
        @GetAuthenticatedUser() user: IAuthenticatedUserPayload
    ) {
        return user;
    }
}