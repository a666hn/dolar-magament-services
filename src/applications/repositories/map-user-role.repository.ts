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
}
