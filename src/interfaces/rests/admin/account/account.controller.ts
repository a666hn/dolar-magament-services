import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserUsecase } from 'src/applications/usecases/domain/admin/users.usecase';
import { ACCOUNT_SIGNUP_URL, ACCOUNT_URL, VERSION_1 } from 'src/dictionaries/constant.dictionary';
import { DataResponse } from 'src/globals/global.interface';
import { AccountTransformers } from './account.transformer';
import { CreateAccountDto } from './dto/account.dto';
import { UserRegistrationDataResponse } from './interfaces/account.interface';

@Controller(`/${VERSION_1}/${ACCOUNT_URL}`)
export class AccountController {
    constructor(
        private userUsecase: UserUsecase,
        private transform: AccountTransformers,
    ) {}

    @Post(ACCOUNT_SIGNUP_URL)
    @HttpCode(201)
    async RegisterUser(
        @Body() userDto: CreateAccountDto,
    ): Promise<DataResponse<UserRegistrationDataResponse>> {
        const user = await this.userUsecase.RegisterUser(userDto);

        return this.transform.transformSuccessRegistration(user);
    }
}
