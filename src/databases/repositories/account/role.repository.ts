import { RolesEntity } from 'src/databases/entities/roles.entity';
import { UsersEntity } from 'src/databases/entities/users.entity';
import { AddRoleDto, FilterRoleDto } from 'src/interfaces/dto/account/role.dto';
import { HandlePostgressError } from 'src/utils/postgress-handle-error';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RolesEntity)
export class RoleRepository extends Repository<RolesEntity> {
    async AddNewRole(role: AddRoleDto, userId: string): Promise<RolesEntity> {
        const { roleName, description } = role;
        const _role = this.create({ roleName, description, createdBy: userId });

        try {
            await this.save(_role);

            return _role;
        } catch (err) {
            HandlePostgressError(err.code, err.message);
        }
    }

    async UpdateRole(
        role: RolesEntity,
        description: string,
        userId: string,
    ): Promise<RolesEntity> {
        role.description = description;
        role.updatedBy = userId;

        try {
            await this.save(role);

            return role;
        } catch (err) {
            HandlePostgressError(err.code, err.message);
        }
    }

    async AssignRoleToUser(
        role: RolesEntity,
        user: UsersEntity,
    ): Promise<RolesEntity> {
        role.users = [user];

        try {
            await this.save(role);

            return role;
        } catch (err) {
            HandlePostgressError(err.code, err.message);
        }
    }

    async GetRoles(filterRoleDto: FilterRoleDto): Promise<RolesEntity[]> {
        const { id, name } = filterRoleDto;
        const query = this.createQueryBuilder('role');

        query.select([
            'role.id',
            'role.roleName',
            'role.createdAt',
            'role.updatedAt',
            'role.version',
        ]);

        if (id) {
            query.andWhere('role.id = :id', { id });
        }

        if (name) {
            query.andWhere('role.roleName = :name', { name });
        }

        try {
            return query.getMany();
        } catch (err) {
            HandlePostgressError(err.code, err.message);
        }
    }
}
