import { Injectable } from '@nestjs/common';
import { RolesEntity } from 'src/infrastructures/database/postgres/entities/roles.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class RolesService {
    async GetRoles(): Promise<RolesEntity[]> {
        const roleRepository = getRepository(RolesEntity);

        return roleRepository.find({
            where: {
                deletedAt: null,
            },
        });
    }
}
