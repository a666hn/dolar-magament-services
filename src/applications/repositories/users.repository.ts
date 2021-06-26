import { UsersEntity } from 'src/infrastructures/database/postgres/entities/users.entity';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Logger, NotFoundException } from '@nestjs/common';
import { ACCOUNT_STATUS } from 'src/globals/global.enum';

@EntityRepository(UsersEntity)
export class UsersRepository extends Repository<UsersEntity> {
    private readonly logger = new Logger(this.constructor.name);

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

    async VerifiedUser(id: string): Promise<void> {
        const user = await this.findOne(id);

        if (!user) {
            throw new NotFoundException(
                'Kami tidak berhasil untuk menemukan data user',
            );
        }

        user.isEmailVerified = true;
        user.accountStatus = ACCOUNT_STATUS.ACTIVE;

        try {
            await this.save(user);
            this.logger.debug(`Berhasil memverifikasi user "${id}"`);
        } catch (err) {
            this.logger.debug(`Gagal memverifikasi user "${id}"`);
            throw err;
        }
    }
}
