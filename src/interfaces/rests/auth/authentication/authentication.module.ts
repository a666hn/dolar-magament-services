import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../../admin/users/users.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationTransformer } from './authentication.transformer';

@Module({
    imports: [
        forwardRef(() => UsersModule),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (env: ConfigService) => ({
                secret: env.get('JWT_SECRET_KEY'),
                signOptions: {
                    expiresIn: env.get('JWT_EXPIRATION_TIME'),
                },
            }),
        }),
    ],
    controllers: [AuthenticationController],
    providers: [
        // Transformers
        AuthenticationTransformer,
    ],
    exports: [JwtModule],
})
export class AuthenticationModule {}
