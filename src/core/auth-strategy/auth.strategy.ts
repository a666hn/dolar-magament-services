import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class AuthStrategy extends PassportStrategy(Strategy) {
    // constructor(
    //     @InjectRepository(AuthRepository)
    //     private authRepository: AuthRepository,
    //     private env: ConfigService,
    // ) {
    //     super({
    //         secretOrKey: env.get('JWT_SECRET_KEY'),
    //         ignoreExpiration: false,
    //         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //     });
    // }
    // async validate(payload: any): Promise<any> {
    //     const { uid } = payload;
    //     const user = await this.authRepository.GetAuthenticatedUser(uid);
    //     if (!user) {
    //         throw new UnauthorizedException('Unauthorized user');
    //     }
    //     return user;
    // }
}
