import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { MapUserRoleEntity } from 'src/infrastructures/database/postgres/entities/map-user-role.entity';
import { UsersEntity } from 'src/infrastructures/database/postgres/entities/users.entity';
import { CreateUserDto } from 'src/interfaces/rests/admin/users/dto/users.dto';
import { SigninDto } from 'src/interfaces/rests/auth/authentication/dto/authentication.dto';
import { HandlePostgressError } from 'src/utils/postgress-handle-error';
import { getConnection, getRepository } from 'typeorm';
import { UsersRepository } from '../repositories/users.repository';
import { UserProfilesRepository } from '../repositories/user_profiles.repository';
import { UserProfilesService } from './user_profiles.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UsersRepository)
        private readonly userRepository: UsersRepository,
        @InjectRepository(UserProfilesRepository)
        private readonly userProfileRepository: UserProfilesRepository,
        private readonly userProfileService: UserProfilesService,
        private readonly jwtService: JwtService,
    ) {}

    async RegisterUser(userDto: CreateUserDto): Promise<UsersEntity> {
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

    async SignInUser(
        userDto: SigninDto,
    ): Promise<[UsersEntity, MapUserRoleEntity[], string, string]> {
        const { username, password } = userDto;
        const user = await this.userRepository.findUserByEmailOrUsername(
            username,
        );

        if (!user) {
            throw new NotFoundException(
                `Kami tidak bisa menemukan user dengan username/email "${username}"`,
            );
        }

        const isPasswordMatch = await this.userRepository.checkPassword(
            user,
            password,
        );

        if (!isPasswordMatch) {
            throw new BadRequestException(
                `Password tidak sesuai. Silahkan coba lagi.`,
            );
        }

        const userWithProfile = await this.userProfileService.GetProfileById(
            user.id,
        );

        const mapRoleUserRepository = getRepository(MapUserRoleEntity);

        const roles = await mapRoleUserRepository.find({
            where: {
                userId: user.id,
            },
            relations: ['role'],
        });

        const payload = {
            uid: user.id,
            username: user.username,
            email: user.email,
            isEmailVerified: user.isEmailVerified,
            status: user.accountStatus,
        };

        const refreshPayload = {
            uid: user.id,
        };

        const token = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(refreshPayload);

        return [userWithProfile, roles, token, refreshToken];
    }
}
