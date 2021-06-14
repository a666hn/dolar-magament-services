import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthRepository } from 'src/databases/repositories/account/auth.repository';
import {
    IAuthenticatedUserPayload,
    IPayloadJwt,
} from 'src/interfaces/interface/auth.interface';

export class AuthStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository,
        private env: ConfigService,
    ) {
        super({
            secretOrKey: env.get('JWT_SECRET_KEY'),
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: IPayloadJwt): Promise<IAuthenticatedUserPayload> {
        const { uid } = payload;

        const user = await this.authRepository.GetAuthenticatedUser(uid);

        if (!user) {
            throw new UnauthorizedException('Unauthorized user');
        }

        return user;
    }
}