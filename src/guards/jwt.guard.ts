import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JWTGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any) {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            throw (
                err ||
                new UnauthorizedException(
                    'Kamu tidak memiliki akses ke halaman ini',
                )
            );
        }

        return user;
    }
}
