import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/infrastructures/database/postgres/entities/users.entity';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UserProfilesService {
    constructor(
        @InjectRepository(UsersRepository)
        private userRepository: UsersRepository,
    ) {}

    async GetProfileById(id: string): Promise<UsersEntity> {
        return this.userRepository.findOne({
            relations: ['profile'], // Ini nama relasi yang kita define di user entity pas make @OneToOne relasi
            where: {
                id: id,
            },
            select: [
                'id',
                'name',
                'username',
                'email',
                'accountStatus',
                'isEmailVerified',
                'profile',
            ],
        });
    }
}
