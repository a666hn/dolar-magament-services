import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserUsecase } from 'src/applications/usecases/domain/admin/users.usecase';
import {
    ACCOUNT_SIGNIN_URL,
    ACCOUNT_URL,
    VERSION_1,
} from 'src/dictionaries/constant.dictionary';
import { DataResponse } from 'src/globals/global.interface';
import { AuthenticationTransformer } from './authentication.transformer';
import { SigninDto } from './dto/authentication.dto';
import { LoginResponse } from './interface/authentication.interface';

@Controller(`/${VERSION_1}/${ACCOUNT_URL}`)
export class AuthenticationController {
    constructor(
        private readonly authTransform: AuthenticationTransformer,
        private readonly userUsecase: UserUsecase,
    ) {}

    @Post(ACCOUNT_SIGNIN_URL)
    @HttpCode(200)
    async SignIn(
        @Body() userDto: SigninDto,
    ): Promise<DataResponse<LoginResponse>> {
        const [user, roles, token, refreshToken] =
            await this.userUsecase.SignInUser(userDto);

        return this.authTransform.transformPayloadInformation(
            user,
            roles,
            token,
            refreshToken,
        );
    }
}
