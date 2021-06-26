import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { flatten, uniq } from 'lodash';
import { UsersEntity } from 'src/infrastructures/database/postgres/entities/users.entity';
import { MailService } from 'src/interfaces/mail/mail.service';
import { CreateUserDto } from 'src/interfaces/rests/admin/users/dto/users.dto';
import { SigninDto } from 'src/interfaces/rests/auth/authentication/dto/authentication.dto';
import { HandlePostgressError } from 'src/utils/postgress-handle-error';
import { getConnection } from 'typeorm';
import { MapUserRoleRepository } from '../repositories/map-user-role.repository';
import { UsersRepository } from '../repositories/users.repository';
import { UserProfilesRepository } from '../repositories/user_profiles.repository';
import { UserProfilesService } from './user_profiles.service';

@Injectable()
export class UserService {
    private readonly connection = getConnection();

    constructor(
        @InjectRepository(UsersRepository)
        private readonly userRepository: UsersRepository,
        @InjectRepository(UserProfilesRepository)
        private readonly userProfileRepository: UserProfilesRepository,
        @InjectRepository(MapUserRoleRepository)
        private readonly mapUserRoleRepository: MapUserRoleRepository,
        private readonly userProfileService: UserProfilesService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailService,
    ) {}

    async RegisterUser(userDto: CreateUserDto): Promise<UsersEntity> {
        const queryRunner = this.connection.createQueryRunner();

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

            // Inject token for verify email
            const verifyEmailPayload = { uid: userModel.id };
            const verifyEmailToken = this.jwtService.sign(verifyEmailPayload, {
                expiresIn: `30d`,
            });

            await this.mailService.sendConfirmationEmail(
                userModel,
                verifyEmailToken,
            );

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
    ): Promise<[UsersEntity, string, string]> {
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

        const userWithCredential =
            await this.userRepository.findUserWithCredentialsById(user.id);

        const roles = userWithCredential?.mapUserRoles?.map(
            (mur) => mur.role?.id,
        );

        const permissions = uniq(
            flatten(
                userWithCredential?.mapUserRoles?.map((mur) =>
                    mur?.role?.mapRolePermissions?.map(
                        (mrp) => mrp?.permission?.name,
                    ),
                ),
            ),
        );

        const payload = {
            uid: user.id,
            username: user.username,
            email: user.email,
            isEmailVerified: user.isEmailVerified,
            status: user.accountStatus,
            roles: roles,
            permissions: permissions,
        };

        const refreshPayload = {
            uid: user.id,
        };

        const token = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(refreshPayload);

        return [userWithCredential, token, refreshToken];
    }

    async GetInformationOfAuthenticatedUser(
        uid: string,
    ): Promise<[UsersEntity, number[]]> {
        const user = await this.userProfileService.GetProfileById(uid);
        const roles = await this.mapUserRoleRepository.GetRolesByUserId(uid);

        const listRoles = roles.map((r) => r?.role?.id);

        return [user, listRoles];
    }

    async VerifyEmail(token: string): Promise<boolean> {
        const queryRunner = this.connection.createQueryRunner();

        queryRunner.connect();

        const decodeToken: any = this.jwtService.decode(token, {
            json: true,
        });

        if (!decodeToken) {
            throw new UnauthorizedException(
                'Kamu tidak memiliki akses pada action ini',
            );
        }

        await queryRunner.startTransaction();

        try {
            await this.userRepository.VerifiedUser(decodeToken.uid);
            await this.mapUserRoleRepository.AddDefaultRoleToNewUser(
                decodeToken.uid,
            );

            queryRunner.commitTransaction();

            return true;
        } catch (err) {
            queryRunner.rollbackTransaction();
            HandlePostgressError(err.code, err.message);
        } finally {
            queryRunner.release();
        }
    }
}
