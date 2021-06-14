import { UsersEntity } from 'src/databases/entities/users.entity';
import { UserRegistrationDto } from 'src/interfaces/dto/account/users.dto';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { HandlePostgressError } from 'src/utils/postgress-handle-error';
import { IAuthenticatedUserPayload } from 'src/interfaces/interface/auth.interface';
import { UsersProfileEntity } from 'src/databases/entities/users_profile.entity';
import { BadRequestException } from '@nestjs/common';

@EntityRepository(UsersEntity)
export class AuthRepository extends Repository<UsersEntity> {
    async RegistrationUser(uDto: UserRegistrationDto): Promise<UsersEntity> {
        const { firstName, lastName, email, password } = uDto;
        const user = this.create({ firstName, lastName, email, password });

        try {
            await this.save(user);

            return user;
        } catch (err) {
            HandlePostgressError(err.code, err.message);
        }
    }

    async GetProfileUser(userId: string): Promise<UsersProfileEntity> {
        if (!userId) {
            throw new BadRequestException(
                'Please provide the user id for get user profile',
            );
        }

        return getRepository(UsersProfileEntity)
            .createQueryBuilder('up')
            .where('up.user_id = :userId', { userId })
            .getOne();
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
                'u.first_name as firstname',
                'u.last_name as lastname',
                `u.first_name || ' ' || u.last_name as fullname`,
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
