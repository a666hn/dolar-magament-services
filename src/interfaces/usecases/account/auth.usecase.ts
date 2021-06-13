import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersEntity } from "src/databases/entities/users.entity";
import { AuthRepository } from "src/databases/repositories/account/auth.repository";
import { UserRegistrationDto, UserSignInDto } from "src/interfaces/dto/account/users.dto";

@Injectable()
export class AuthUsecase {
    constructor(
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository
    ) {}

    async RegisterUser(uDto: UserRegistrationDto): Promise<UsersEntity> {
        return this.authRepository.userRegistration(uDto);
    }

    async UserSignIn(userSignInDto: UserSignInDto): Promise<UsersEntity> {
        const { email, password } = userSignInDto
        const user: UsersEntity = await this.authRepository.findOne({ where: { email } });

        if (!user) {
            throw new NotFoundException(`User with email ${email} is not exist, or maybe has been inactive`)
        }

        const isMatch = await this.authRepository.UserSignIn(user, password);

        if (!isMatch) {
            throw new BadRequestException('Password not match')
        }

        return user;
    }
}