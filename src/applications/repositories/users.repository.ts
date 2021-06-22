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
}
