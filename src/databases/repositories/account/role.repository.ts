import { BadRequestException } from "@nestjs/common";
import { RolesEntity } from "src/databases/entities/roles.entity";
import { UsersEntity } from "src/databases/entities/users.entity";
import { AddRoleDto, FilterRoleDto } from "src/interfaces/dto/account/role.dto";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(RolesEntity)
export class RoleRepository extends Repository<RolesEntity> {
    async AddNewRole(role: AddRoleDto): Promise<RolesEntity> {
        const { roleName, description } = role;
        const _role = this.create({ roleName, description })

        try {
            await this.save(_role);

            return _role;
        } catch (err) {
            throw new BadRequestException('Error');
        }
    }

    async UpdateRole(role: RolesEntity, description: string): Promise<RolesEntity> {
        role.description = description;

        await this.save(role);

        return role;
    }

    async AssignRoleToUser(role: RolesEntity, user: UsersEntity): Promise<RolesEntity> {
        role.users = [user];

        try {
            await this.save(role);

            return role;
        } catch (err) {
            throw new BadRequestException('Something is gonna be wrong');
        }
    }

    async GetRoles(filterRoleDto: FilterRoleDto): Promise<RolesEntity[]> {
        const { id, name } = filterRoleDto;
        const query = this.createQueryBuilder('role');

        query.select(['role.id', 'role.roleName', 'role.createdAt', 'role.updatedAt', 'role.version']);

        if (id) {
            query.andWhere('role.id = :id', { id });
        }

        if (name) {
            query.andWhere('role.roleName = :name', { name });
        }

        return query.getMany();
    }
}