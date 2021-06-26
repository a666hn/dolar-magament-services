import { Controller, Post, Query } from '@nestjs/common';
import { UserUsecase } from 'src/applications/usecases/admin/users.usecase';
import {
    CONFIRMATION_EMAIL_URL,
    EMAIL_URL,
    VERSION_1,
} from 'src/dictionaries/constant.dictionary';
import { DataResponse } from 'src/globals/global.interface';
import { EmailVerifyDto } from './dto/email-verify.dto';
import { VerifyEmailTransformer } from './email-verify.transformer';

@Controller(`/${VERSION_1}/${EMAIL_URL}`)
export class VerifyEmailController {
    constructor(
        private readonly userUsecase: UserUsecase,
        private readonly emailTransform: VerifyEmailTransformer,
    ) {}

    @Post(CONFIRMATION_EMAIL_URL)
    async verifyEmail(
        @Query() emailDto: EmailVerifyDto,
    ): Promise<DataResponse<any>> {
        const verifiedStatus = await this.userUsecase.VerifyEmail(emailDto);
        return this.emailTransform.transformEmailVerification(verifiedStatus);
    }
}
