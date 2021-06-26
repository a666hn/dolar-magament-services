import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TransformersGlobal } from 'src/globals/transformers.global';
import { JWTAuthStrategy } from 'src/guards/strategy/jwt-auth.strategy';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationTransformer } from './authentication.transformer';
import { ImportAuthenticationModule } from './module.import';

@Module({
    imports: ImportAuthenticationModule,
    controllers: [AuthenticationController],
    providers: [
        // Transformers
        AuthenticationTransformer,
        TransformersGlobal,

        JWTAuthStrategy,
    ],
    exports: [JwtModule, PassportModule, JWTAuthStrategy],
})
export class AuthenticationModule {}
