import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetAuthenticatedUser } from 'src/core/decorator/user.decorator';
import { RolesEntity } from 'src/databases/entities/roles.entity';
import {
    ACCOUNT_BASE_URL,
    ROLE_ASSIGN_ROLE_TO_USER,
    ROLE_BASE_URL,
    ROLE_CREATE_ONE,
    ROLE_DELETE_ONE,
    ROLE_GET_MANY,
    ROLE_UPDATE_ONE,
    VERSION_1,
} from 'src/globals/dictionary/url.dictionary';
import { AddRoleDto, FilterRoleDto } from 'src/interfaces/dto/account/role.dto';
import { RolesUseCase } from 'src/interfaces/usecases/account/role.usecase';

@Controller(`${VERSION_1}/${ACCOUNT_BASE_URL}/${ROLE_BASE_URL}`)
export class RoleController {
    constructor(private roleUsecase: RolesUseCase) {}

    @Post(ROLE_CREATE_ONE)
    @UseGuards(AuthGuard())
    RegisterRole(
        @Body() roleDto: AddRoleDto,
        @GetAuthenticatedUser('uid') userId: string,
    ): Promise<RolesEntity> {
        return this.roleUsecase.RegisterRole(roleDto, userId);
    }

    @Patch(`${ROLE_UPDATE_ONE}/:id`)
    @UseGuards(AuthGuard())
    UpdateRole(
        @Param('id') id: string,
        @Body('description') description: string,
        @GetAuthenticatedUser('uid') userId: string,
    ): Promise<RolesEntity> {
        return this.roleUsecase.UpdateRole(id, description, userId);
    }

    @Delete(`${ROLE_DELETE_ONE}/:id`)
    @UseGuards(AuthGuard())
    DeleteRole(@Param('id') id: string): Promise<void> {
        return this.roleUsecase.DeleteRole(id);
    }

    @Post(ROLE_ASSIGN_ROLE_TO_USER)
    @UseGuards(AuthGuard())
    @UseInterceptors(ClassSerializerInterceptor)
    AssignRoleToUser(
        @Body('userId') userId: string,
        @Body('roleId') roleId: string,
    ): Promise<RolesEntity> {
        return this.roleUsecase.AssignRoleToUser(userId, roleId);
    }

    @Get(ROLE_GET_MANY)
    @UseGuards(AuthGuard())
    GetRoles(@Query() filterRoleDto: FilterRoleDto): Promise<RolesEntity[]> {
        return this.roleUsecase.GetRoles(filterRoleDto);
    }
}
