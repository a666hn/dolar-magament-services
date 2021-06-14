import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/databases/entities/users.entity';
import { UsersProfileEntity } from 'src/databases/entities/users_profile.entity';
import { AuthRepository } from 'src/databases/repositories/account/auth.repository';
import { UsersUseCase } from 'src/databases/usecases/users.usecase';
import {
    UserProfileDto,
    UserRegistrationDto,
    UserSignInDto,
} from 'src/interfaces/dto/account/users.dto';
import {
    IAuthenticatedUserPayload,
    IPayloadJwt,
    ISignInResponse,
} from 'src/interfaces/interface/auth.interface';

@Injectable()
export class AuthUsecase {
    constructor(
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository,
        private jwtService: JwtService,
        private userUseCase: UsersUseCase,
    ) {}

    async RegisterUser(
        // uDto: UserRegistrationDto,
        userProfileDto: UserProfileDto,
    ): Promise<[UsersEntity, UsersProfileEntity]> {
        // const user = await this.authRepository.RegistrationUser(uDto);
        // const userProfile = await this.authRepository.GetProfileUser(user.id);

        const [user, userProfile] =
            await this.userUseCase.RegisterNewUserWithProfile(userProfileDto);

        return [user, userProfile];
    }

    async UserSignIn(
        userSignInDto: UserSignInDto,
    ): Promise<ISignInResponse<IAuthenticatedUserPayload>> {
        const { email, password } = userSignInDto;
        const user: UsersEntity = await this.authRepository.findOne({
            where: { email },
        });

        if (!user) {
            throw new NotFoundException(
                `User with email ${email} is not exist, or maybe has been inactive`,
            );
        }

        const [isMatch, userData] = await this.authRepository.CheckUserSignIn(
            user,
            password,
        );

        if (!isMatch) {
            throw new BadRequestException('Password not match');
        }

        const payload: IPayloadJwt = {
            uid: user.id,
            username: user?.username,
            email: user.email,
            isEmailVerified: user.isEmailVerified,
        };

        const token: string = this.jwtService.sign(payload);

        const response: ISignInResponse<IAuthenticatedUserPayload> = {
            token,
            userData,
        };

        return response;
    }
}
