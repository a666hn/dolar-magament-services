import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/applications/services/users.service';
import { UsersEntity } from 'src/infrastructures/database/postgres/entities/users.entities';
import { CreateAccountDto } from 'src/interfaces/rests/admin/account/dto/account.dto';

@Injectable()
export class AccountUsecase {
    constructor(private readonly accountService: AccountService) {}

    async RegisterUser(userDto: CreateAccountDto): Promise<UsersEntity> {
        return this.accountService.RegisterUser(userDto);
    }
}
