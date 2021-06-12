import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersEntity } from "src/databases/entities/users.entity";
import { AuthRepository } from "src/databases/repositories/account/auth.repository";
import { UserRegistrationDto } from "src/interfaces/dto/account/users.dto";

@Injectable()
export class AuthUsecase {
    constructor(
        @InjectRepository(AuthRepository)
        private uRepository: AuthRepository
    ) {}

    async RegisterUser(uDto: UserRegistrationDto): Promise<UsersEntity> {
        return this.uRepository.userRegistration(uDto);
    }
}