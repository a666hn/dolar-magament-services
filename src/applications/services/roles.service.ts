import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesEntity } from 'src/infrastructures/database/postgres/entities/roles.entity';
import { HandlePostgressError } from 'src/utils/postgress-handle-error';
import { getRepository } from 'typeorm';
import { MapUserRoleRepository } from '../repositories/map-user-role.repository';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(MapUserRoleRepository)
        private readonly mapUserRoleRepository: MapUserRoleRepository,
        @InjectRepository(UsersRepository)
        private readonly userRepositury: UsersRepository,
    ) {}

    async GetRoles(): Promise<RolesEntity[]> {
        const roleRepository = getRepository(RolesEntity);

        return roleRepository.find({
            where: {
                deletedAt: null,
            },
        });
    }

    async AssignRoleToUser(userId: string, roleId: number): Promise<string> {
        const isExistUser = await this.userRepositury.checkExistUserById(
            userId,
        );

        if (!isExistUser) {
            throw new NotFoundException(
                `Tidak dapat menemukan user dengan ID ${userId}`,
            );
        }

        const assignRole = this.mapUserRoleRepository.create({
            userId,
            roleId,
        });

        try {
            await this.mapUserRoleRepository.save(assignRole);

            return 'Berhasil menambahkan role ke user!';
        } catch (error) {
            HandlePostgressError(error.code, error.message);
        }
    }
}
