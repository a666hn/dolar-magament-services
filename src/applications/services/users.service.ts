import { Injectable } from '@nestjs/common';
import { UsersEntity } from 'src/infrastructures/database/postgres/entities/users.entity';
import { UserProfilesEntity } from 'src/infrastructures/database/postgres/entities/user_profiles.entity';
import { CreateAccountDto } from 'src/interfaces/rests/admin/account/dto/account.dto';
import { HandlePostgressError } from 'src/utils/postgress-handle-error';
import { getConnection } from 'typeorm';

@Injectable()
export class UserService {
    async RegisterUser(userDto: CreateAccountDto): Promise<UsersEntity> {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();

        queryRunner.connect();

        const { email, firstName, lastName, password } = userDto;
        const name = lastName ? `${firstName} ${lastName}` : firstName;

        const user = queryRunner.manager.create(UsersEntity, {
            name,
            email,
            password,
        });
        const userProfile = queryRunner.manager.create(UserProfilesEntity, user);

        await queryRunner.startTransaction();

        try {
            // Save profile duluan, soalnya relation id nya manggil
            // profile id di user, makanya kita butuh buat menyimpan data
            // Profile dulu baru nyimpen data user, kalo gak relasi nya
            // nanti gak masuk!!!

            // Save user profile first
            await queryRunner.manager.save(userProfile);

            // Then save user
            user.profile = userProfile;

            await queryRunner.manager.save(user);

            await queryRunner.commitTransaction();

            return user;
        } catch (error) {
            queryRunner.rollbackTransaction();
            HandlePostgressError(error.code, error.message);
        } finally {
            queryRunner.release();
        }
    }
}
