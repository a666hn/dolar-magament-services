import { Body, Controller, Delete, Param, Patch, Post } from "@nestjs/common";
import { RolesEntity } from "src/databases/entities/roles.entity";
import { AddRoleDto } from "src/interfaces/dto/account/role.dto";
import { RolesUseCase } from "src/interfaces/usecases/account/role.usecase";

@Controller('role')
export class RoleController {
    constructor(private roleUsecase: RolesUseCase) {}

    @Post()
    RegisterRole(@Body() roleDro: AddRoleDto): Promise<RolesEntity> {
        return this.roleUsecase.RegisterRole(roleDro);
    }

    @Patch('/:id')
    UpdateRole(
        @Param('id') id: string,
        @Body('description') description: string
    ): Promise<RolesEntity> {
        return this.roleUsecase.UpdateRole(id, description);
    }

    @Delete('/:id/delete')
    DeleteRole(@Param('id') id: string): Promise<void> {
        return this.roleUsecase.DeleteRole(id);
    }

    @Post('assign-role')
    AssignRoleToUser(
        @Body('userId') userId: string,
        @Body('roleId') roleId: string
    ): Promise<RolesEntity> {
        return this.roleUsecase.AssignRoleToUser(userId, roleId);
    }
}