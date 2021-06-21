import { Injectable } from '@nestjs/common';
import { UserService } from 'src/applications/services/users.service';
import { UsersEntity } from 'src/infrastructures/database/postgres/entities/users.entity';
import { CreateAccountDto } from 'src/interfaces/rests/admin/account/dto/account.dto';

@Injectable()
export class UserUsecase {
    constructor(private readonly userService: UserService) {}

    async RegisterUser(userDto: CreateAccountDto): Promise<UsersEntity> {
        return this.userService.RegisterUser(userDto);
    }
}
