import { Injectable } from '@nestjs/common';
import { RolesService } from 'src/applications/services/roles.service';
import { RolesEntity } from 'src/infrastructures/database/postgres/entities/roles.entity';

@Injectable()
export class RolesUsecase {
    constructor(private readonly roleService: RolesService) {}

    async GetRoles(): Promise<RolesEntity[]> {
        return this.roleService.GetRoles();
    }
}
