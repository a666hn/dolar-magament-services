import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountRepository } from 'src/applications/repositories/users.repository';
import { UsersEntity } from 'src/infrastructures/database/postgres/entities/users.entities';
import { UserProfiles } from 'src/infrastructures/database/postgres/entities/user_profiles.entity';
import { CreateAccountDto } from 'src/interfaces/rests/admin/account/dto/account.dto';
import { HandlePostgressError } from 'src/utils/postgress-handle-error';
import { getConnection } from 'typeorm';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountRepository)
        private accountRepository: AccountRepository,
    ) {}

    async RegisterUser(userDto: CreateAccountDto): Promise<UsersEntity> {
        const { email, firstName, lastName, password } = userDto;
        const name = lastName ? `${firstName.toUpperCase()} ${lastName.toUpperCase()}` : firstName.toUpperCase();

        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();

        queryRunner.connect();

        const user = queryRunner.manager.create(UsersEntity, {
            name,
            email,
            password,
        });
        const userProfile = queryRunner.manager.create(UserProfiles, user);

        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.save(user);
            await queryRunner.manager.save(userProfile);

            const profile = await queryRunner.manager.findOne(UserProfiles, userProfile.id);

            user.profile = profile;

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
