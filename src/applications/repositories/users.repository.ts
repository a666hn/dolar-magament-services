import { UsersEntity } from 'src/infrastructures/database/postgres/entities/users.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UsersEntity)
export class UsersRepository extends Repository<UsersEntity> {
    async checkExistUserById(id: string): Promise<boolean> {
        return !!this.findOne(id);
    }
}
