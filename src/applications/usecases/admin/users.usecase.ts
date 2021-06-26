import { Injectable } from '@nestjs/common';
import { UserService } from 'src/applications/services/users.service';
import { UsersEntity } from 'src/infrastructures/database/postgres/entities/users.entity';
import { CreateUserDto } from 'src/interfaces/rests/admin/users/dto/users.dto';
import { SigninDto } from 'src/interfaces/rests/auth/authentication/dto/authentication.dto';
import { EmailVerifyDto } from 'src/interfaces/rests/auth/email-verify/dto/email-verify.dto';

@Injectable()
export class UserUsecase {
    constructor(private readonly userService: UserService) {}

    async RegisterUser(userDto: CreateUserDto): Promise<UsersEntity> {
        return this.userService.RegisterUser(userDto);
    }

    async SignInUser(
        userDto: SigninDto,
    ): Promise<[UsersEntity, string, string]> {
        return this.userService.SignInUser(userDto);
    }

    async VerifyEmail(emailDto: EmailVerifyDto): Promise<boolean> {
        return this.userService.VerifyEmail(emailDto.token);
    }
}
