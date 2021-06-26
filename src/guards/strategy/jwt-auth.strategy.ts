import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/applications/services/users.service';
import { GetInformationOfAuthenticatedUserData } from 'src/globals/global.interface';
import { TransformersGlobal } from 'src/globals/transformers.global';

@Injectable()
export class JWTAuthStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userService: UserService,
        private readonly env: ConfigService,
        private readonly transformerGlobal: TransformersGlobal,
    ) {
        super({
            secretOrKey: env.get('JWT_SECRET_KEY'),
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(
        payload: any,
    ): Promise<GetInformationOfAuthenticatedUserData> {
        const { uid } = payload;
        const userWithCredentials =
            await this.userService.GetInformationOfAuthenticatedUser(uid);

        if (!userWithCredentials) {
            throw new UnauthorizedException('Unauthorized user');
        }

        return this.transformerGlobal.transformUserCredentials(
            userWithCredentials,
        );
    }
}
