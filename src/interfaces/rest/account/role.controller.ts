import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetAuthenticatedUser } from "src/core/decorator/user.decorator";
import { RolesEntity } from "src/databases/entities/roles.entity";
import { AddRoleDto, FilterRoleDto } from "src/interfaces/dto/account/role.dto";
import { RolesUseCase } from "src/interfaces/usecases/account/role.usecase";

@Controller('role')
export class RoleController {
    constructor(private roleUsecase: RolesUseCase) {}

    @Post()
    @UseGuards(AuthGuard())
    RegisterRole(
        @Body() roleDto: AddRoleDto,
        @GetAuthenticatedUser('id') userId: string
    ): Promise<RolesEntity> {
        return this.roleUsecase.RegisterRole(roleDto, userId);
    }

    @Patch('/:id')
    @UseGuards(AuthGuard())
    UpdateRole(
        @Param('id') id: string,
        @Body('description') description: string,
        @GetAuthenticatedUser('id') userId: string
    ): Promise<RolesEntity> {
        return this.roleUsecase.UpdateRole(id, description, userId);
    }

    @Delete('/:id/delete')
    @UseGuards(AuthGuard())
    DeleteRole(@Param('id') id: string): Promise<void> {
        return this.roleUsecase.DeleteRole(id);
    }

    @Post('assign-role')
    @UseGuards(AuthGuard())
    AssignRoleToUser(
        @Body('userId') userId: string,
        @Body('roleId') roleId: string
    ): Promise<RolesEntity> {
        return this.roleUsecase.AssignRoleToUser(userId, roleId);
    }

    @Get()
    @UseGuards(AuthGuard())
    GetRoles(@Query() filterRoleDto: FilterRoleDto): Promise<RolesEntity[]> {
        return this.roleUsecase.GetRoles(filterRoleDto);
    }
}