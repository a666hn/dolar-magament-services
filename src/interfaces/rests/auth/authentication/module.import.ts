import { forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../../admin/users/users.module';

export const ImportAuthenticationModule = [
    forwardRef(() => UsersModule),
    PassportModule.registerAsync({
        inject: [ConfigService],
        useFactory: async (env: ConfigService) => ({
            defaultStrategy: env.get('PASSPORT_DEFAULT_STRATEGY'),
        }),
    }),
    JwtModule.registerAsync({
        inject: [ConfigService],
        useFactory: async (env: ConfigService) => ({
            secret: env.get('JWT_SECRET_KEY'),
            signOptions: {
                expiresIn: `${env.get('JWT_EXPIRATION_TIME')}s`,
            },
        }),
    }),
];
