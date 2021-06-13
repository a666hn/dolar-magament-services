import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

export const RegisterAuthModule = [
    PassportModule.registerAsync({
        inject: [ConfigService],
        useFactory: async (env: ConfigService) => ({
            defaultStrategy: env.get('PASSPORT_DEFAULT_STRATEGY')
        })
    }),
    JwtModule.registerAsync({
        inject: [ConfigService],
        useFactory: async (env: ConfigService) => ({
            secret: env.get('JWT_SECRET_KEY'),
            signOptions: {
                expiresIn: `${env.get('JWT_EXPIRATION_TIME')}s`
            }
        })
    })
]