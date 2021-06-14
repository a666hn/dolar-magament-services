import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    HttpCode,
    Post,
    UseInterceptors,
} from '@nestjs/common';
// import { UsersEntity } from 'src/databases/entities/users.entity';
import {
    ACCOUNT_BASE_URL,
    AUTH_BASE_URL,
    AUTH_REGISTRATION,
    AUTH_SIGNIN,
    VERSION_1,
} from 'src/globals/dictionary/url.dictionary';
import {
    UserRegistrationDto,
    UserSignInDto,
} from 'src/interfaces/dto/account/users.dto';
import {
    IAuthenticatedUserPayload,
    ISignInResponse,
} from 'src/interfaces/interface/auth.interface';
import { AuthTransformers } from 'src/interfaces/transformers/auth.transformer';
import { AuthUsecase } from 'src/interfaces/usecases/account/auth.usecase';

@Controller(`${VERSION_1}/${ACCOUNT_BASE_URL}/${AUTH_BASE_URL}`)
export class AuthController {
    constructor(
        private aUsecase: AuthUsecase,
        private authTransform: AuthTransformers,
    ) {}

    @Post(AUTH_REGISTRATION)
    @UseInterceptors(ClassSerializerInterceptor)
    async RegisterUser(@Body() uDto: UserRegistrationDto) {
        const [user, userProfile] = await this.aUsecase.RegisterUser(uDto);

        return this.authTransform.transformResponseRegisterUser(
            user,
            userProfile,
        ).data;
    }

    @HttpCode(200)
    @Post(AUTH_SIGNIN)
    @UseInterceptors(ClassSerializerInterceptor)
    UserSignIn(
        @Body() userSignInDto: UserSignInDto,
    ): Promise<ISignInResponse<IAuthenticatedUserPayload>> {
        return this.aUsecase.UserSignIn(userSignInDto);
    }
}
