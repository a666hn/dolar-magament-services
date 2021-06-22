import { Controller, Get, NotFoundException } from '@nestjs/common';
import { RolesUsecase } from 'src/applications/usecases/domain/admin/roles.usecase';
import { ROLES_GET_ALL_URL, ROLES_URL, VERSION_1 } from 'src/dictionaries/constant.dictionary';
import { DataResponse } from 'src/globals/global.interface';
import { RoleResponse } from './interface/roles.interface';
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
}