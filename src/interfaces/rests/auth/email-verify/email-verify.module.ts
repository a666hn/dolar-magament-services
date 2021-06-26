import { Module } from '@nestjs/common';
import { UsersModule } from '../../admin/users/users.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { VerifyEmailController } from './email-verify.controller';
import { VerifyEmailTransformer } from './email-verify.transformer';

@Module({
    imports: [AuthenticationModule, UsersModule],
    controllers: [VerifyEmailController],
    providers: [
        // Transformers
        VerifyEmailTransformer,
    ],
})
export class VerifyEmailModule {}
