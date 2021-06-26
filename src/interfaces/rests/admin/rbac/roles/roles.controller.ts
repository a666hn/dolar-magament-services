import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import { RolesUsecase } from 'src/applications/usecases/admin/roles.usecase';
import {
    RBAC_KEY_ID,
    ROLES_ASSIGN_USER_URL,
    ROLES_GET_ALL_URL,
    ROLES_URL,
    VERSION_1,
} from 'src/dictionaries/constant.dictionary';
import {
    DataResponse,
    GetInformationOfAuthenticatedUserData,
} from 'src/globals/global.interface';
import { GetAuthenticatedUser } from 'src/guards/decorators/user-authenticated.decorator';
import { JWTGuard } from 'src/guards/jwt.guard';
import { RBACGuard } from 'src/guards/rbac.guard';
import { RequiredRBAC } from 'src/guards/rbac.metadata';
import { RoleResponse } from '../interface/roles.interface';
import { RolesTransformers } from './roles.transformer';

@Controller(`/${VERSION_1}/${ROLES_URL}`)
export class RolesController {
    constructor(
        private readonly roleUsecase: RolesUsecase,
        private readonly roleTransformer: RolesTransformers,
    ) {}

    @Get(ROLES_GET_ALL_URL)
    async GetRoles(): Promise<DataResponse<RoleResponse>> {
        const roles = await this.roleUsecase.GetRoles();

        if (!roles || roles.length < 1) {
            throw new NotFoundException('Kami tidak dapat menemukan data role');
        }

        return this.roleTransformer.transformAllRoles(roles);
    }

    @UseGuards(JWTGuard, RBACGuard)
    @RequiredRBAC(
        RBAC_KEY_ID.SYSTEM_ADMINISTRATOR_GUARD,
        RBAC_KEY_ID.ADMINISTRATOR_GUARD,
    )
    @Post(`/${ROLES_ASSIGN_USER_URL}/:id`)
    async AssignRoleToUser(
        @Param('id') id: string,
        @Body('roleId') roleId: number,
    ): Promise<DataResponse<string>> {
        const msg = await this.roleUsecase.AssignRoleToUser(id, roleId);

        return this.roleTransformer.transformAssignRoleToUser(msg);
    }

    @UseGuards(JWTGuard, RBACGuard)
    @RequiredRBAC(RBAC_KEY_ID.GUEST_GUARD)
    @Get('/test')
    GetTest(
        @GetAuthenticatedUser() user: GetInformationOfAuthenticatedUserData,
    ): void {
        console.log('oke', user);
    }
}
