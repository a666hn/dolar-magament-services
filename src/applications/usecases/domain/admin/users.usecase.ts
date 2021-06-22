import { Injectable } from '@nestjs/common';
import { UserService } from 'src/applications/services/users.service';
import { MapUserRoleEntity } from 'src/infrastructures/database/postgres/entities/map-user-role.entity';
import { UsersEntity } from 'src/infrastructures/database/postgres/entities/users.entity';
import { CreateUserDto } from 'src/interfaces/rests/admin/users/dto/users.dto';
import { SigninDto } from 'src/interfaces/rests/auth/authentication/dto/authentication.dto';

@Injectable()
export class UserUsecase {
    constructor(private readonly userService: UserService) {}

    async RegisterUser(userDto: CreateUserDto): Promise<UsersEntity> {
        return this.userService.RegisterUser(userDto);
    }

    async SignInUser(
        userDto: SigninDto,
    ): Promise<[UsersEntity, MapUserRoleEntity[], string, string]> {
        return this.userService.SignInUser(userDto);
    }
}
