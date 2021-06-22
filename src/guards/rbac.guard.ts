import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RBAC_METADATA_KEY } from 'src/dictionaries/constant.dictionary';

@Injectable()
export class RBACGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<number[]>(
            RBAC_METADATA_KEY,
            context.getHandler(),
        );

        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const { user } = request;

        const isHaveRole = this.checkRoles(user?.roles, roles);

        if (!isHaveRole) {
            throw new UnauthorizedException(
                'Kamu tidak memiliki akses ke resource ini',
            );
        }

        return isHaveRole;
    }

    private checkRoles(roles: number[], rolesContext: number[]): boolean {
        return roles.some((r: number) => rolesContext.indexOf(r) > -1);
    }
}
