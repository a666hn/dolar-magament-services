import { Injectable } from '@nestjs/common';
import { UserService } from 'src/applications/services/users.service';
import { UsersEntity } from 'src/infrastructures/database/postgres/entities/users.entity';
import { CreateUserDto } from 'src/interfaces/rests/admin/users/dto/users.dto';

@Injectable()
export class UserUsecase {
    constructor(private readonly userService: UserService) {}

    async RegisterUser(userDto: CreateUserDto): Promise<UsersEntity> {
        return this.userService.RegisterUser(userDto);
    }
}
