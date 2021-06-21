import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/infrastructures/database/postgres/entities/users.entity';
import { CreateAccountDto } from 'src/interfaces/rests/admin/account/dto/account.dto';
import { HandlePostgressError } from 'src/utils/postgress-handle-error';
import { getConnection } from 'typeorm';
import { UsersRepository } from '../repositories/users.repository';
import { UserProfilesRepository } from '../repositories/user_profiles.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UsersRepository)
        private readonly userRepository: UsersRepository,
        @InjectRepository(UserProfilesRepository)
        private readonly userProfileRepository: UserProfilesRepository,
    ) {}
    async RegisterUser(userDto: CreateAccountDto): Promise<UsersEntity> {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();

        queryRunner.connect();

        const { email, firstName, lastName, password } = userDto;
        const name = lastName ? `${firstName} ${lastName}` : firstName;

        const userModel = this.userRepository.create({ name, email, password });
        const userProfileModel = this.userProfileRepository.create(userModel);

        await queryRunner.startTransaction();

        try {
            // Save profile duluan, soalnya relation id nya manggil
            // profile id di user, makanya kita butuh buat menyimpan data
            // Profile dulu baru nyimpen data user, kalo gak relasi nya
            // nanti gak masuk!!!

            await this.userProfileRepository.save(userProfileModel);

            // Inject profile into user model
            userModel.profile = userProfileModel;

            await this.userRepository.save(userModel);

            await queryRunner.commitTransaction();

            return userModel;
        } catch (error) {
            queryRunner.rollbackTransaction();
            HandlePostgressError(error.code, error.message);
        } finally {
            queryRunner.release();
        }
    }
}
