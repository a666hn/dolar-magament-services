import { UsersEntity } from 'src/infrastructures/database/postgres/entities/users.entity';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@EntityRepository(UsersEntity)
export class UsersRepository extends Repository<UsersEntity> {
    async checkExistUserById(id: string): Promise<boolean> {
        return !!this.findOne(id);
    }

    async findUserByEmailOrUsername(keyword: string): Promise<UsersEntity> {
        return this.findOne({
            where: [{ email: keyword }, { username: keyword }],
        });
    }

    async checkPassword(user: UsersEntity, password: string): Promise<boolean> {
        return await bcrypt.compare(password, user.password);
    }

    async findUserWithCredentialsById(userId: string): Promise<UsersEntity> {
        return this.findOne({
            where: {
                id: userId,
            },
            join: {
                alias: 'user',
                leftJoinAndSelect: {
                    profile: 'user.profile',
                    mapUserRoles: 'user.mapUserRoles',
                    role: 'mapUserRoles.role',
                    mapRolePermissions: 'role.mapRolePermissions',
                    permission: 'mapRolePermissions.permission',
                },
            },
        });
    }
}
