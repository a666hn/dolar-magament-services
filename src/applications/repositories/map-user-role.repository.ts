import { MapUserRoleEntity } from 'src/infrastructures/database/postgres/entities/map-user-role.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(MapUserRoleEntity)
export class MapUserRoleRepository extends Repository<MapUserRoleEntity> {
    async GetRolesByUserId(uid: string): Promise<MapUserRoleEntity[]> {
        return this.find({
            where: {
                userId: uid,
            },
            relations: ['role'],
        });
    }

    async AddDefaultRoleToNewUser(userId: string): Promise<any> {
        const roleToUser = this.create({ userId });
        roleToUser.roleId = 3;

        try {
            await this.save(roleToUser);
            return true;
        } catch (err) {
            throw err;
        }
    }
}
