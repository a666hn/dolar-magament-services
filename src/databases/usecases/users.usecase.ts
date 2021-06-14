import { InternalServerErrorException } from '@nestjs/common';
import { UserProfileDto } from 'src/interfaces/dto/account/users.dto';
import { getConnection } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';
import { UsersProfileEntity } from '../entities/users_profile.entity';

export class UsersUseCase {
    async RegisterNewUserWithProfile(
        userProfileDto: UserProfileDto,
    ): Promise<[UsersEntity, UsersProfileEntity]> {
        const { firstName, lastName, email, password, bio, address } =
            userProfileDto;
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();

        queryRunner.connect();

        const user = queryRunner.manager.create(UsersEntity, {
            firstName,
            lastName,
            email,
            password,
        });

        const profile = queryRunner.manager.create(UsersProfileEntity, {
            bio,
            address,
        });

        profile.user = user;

        queryRunner.startTransaction();

        try {
            await queryRunner.manager.save(user);
            await queryRunner.manager.save(profile);

            await queryRunner.commitTransaction();

            return [user, profile];
        } catch (err) {
            await queryRunner.rollbackTransaction();

            throw new InternalServerErrorException(err.message);
        } finally {
            await queryRunner.release();
        }
    }
}
