import { Body, Controller, Post } from '@nestjs/common';
import { UserUsecase } from 'src/applications/usecases/admin/users.usecase';
import {
    ACCOUNT_SIGNUP_URL,
    ACCOUNT_URL,
    VERSION_1,
} from 'src/dictionaries/constant.dictionary';
import { DataResponse } from 'src/globals/global.interface';
import { UsersTransformer } from './users.transformer';
import { CreateUserDto } from './dto/users.dto';
import { UserRegistrationDataResponse } from './interfaces/users.interface';

@Controller(`/${VERSION_1}/${ACCOUNT_URL}`)
export class UsersController {
    constructor(
        private userUsecase: UserUsecase,
        private transform: UsersTransformer,
    ) {}

    @Post(ACCOUNT_SIGNUP_URL)
    async RegisterUser(
        @Body() userDto: CreateUserDto,
    ): Promise<DataResponse<UserRegistrationDataResponse>> {
        const user = await this.userUsecase.RegisterUser(userDto);

        return this.transform.transformSuccessRegistration(user);
    }
}
