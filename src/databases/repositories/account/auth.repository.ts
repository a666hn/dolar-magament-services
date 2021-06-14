import { UsersEntity } from 'src/databases/entities/users.entity';
import { UserRegistrationDto } from 'src/interfaces/dto/account/users.dto';
import { CreatePassword } from 'src/utils/util';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { HandlePostgressError } from 'src/utils/postgress-handle-error';
import { IAuthenticatedUserPayload } from 'src/interfaces/interface/auth.interface';

@EntityRepository(UsersEntity)
export class AuthRepository extends Repository<UsersEntity> {
    async userRegistration(uDto: UserRegistrationDto): Promise<UsersEntity> {
        const { name, email, password } = uDto;
        const p = await CreatePassword(password);
        const user = this.create({ name, email, password: p });

        try {
            await this.save(user);

            return user;
        } catch (err) {
            HandlePostgressError(err.code, err.message);
        }
    }

    async CheckUserSignIn(
        user: UsersEntity,
        password: string,
    ): Promise<[boolean, IAuthenticatedUserPayload]> {
        const isMatch = await bcrypt.compare(password, user.password);

        const userData: IAuthenticatedUserPayload =
            await this.GetAuthenticatedUser(user.id);

        return [isMatch, userData];
    }

    async GetAuthenticatedUser(
        uid: string,
    ): Promise<IAuthenticatedUserPayload> {
        const query = this.createQueryBuilder('u');

        query
            .leftJoinAndSelect('roles_user', 'ru', 'ru.users = u.id')
            .leftJoinAndSelect('roles', 'r', 'r.id = ru.roles')
            .select([
                'u.id as uid',
                'u.nameFirst as firstname',
                'u.nameLast as lastname',
                `u.nameFirst || ' ' || u.nameLast as fullname`,
                'u.username as username',
                'u.email as email',
                'u.isEmailVerified as isEmailVerified',
                'u.phoneNumber as phoneNumber',
                'r.id as role',
            ]);

        query.andWhere('u.id = :uid', { uid });

        return query.getRawOne();
    }
}
