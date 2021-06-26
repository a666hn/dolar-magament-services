import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/infrastructures/database/postgres/entities/users.entity';
import { HandlePostgressError } from 'src/utils/postgress-handle-error';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UserProfilesService {
    constructor(
        @InjectRepository(UsersRepository)
        private userRepository: UsersRepository,
    ) {}

    async GetProfileById(id: string): Promise<UsersEntity> {
        try {
            const userProfile = await this.userRepository.findOne({
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

            if (!userProfile) {
                throw new NotFoundException(
                    `Kami tidak menemukan user dengan id "${id}"`,
                );
            }

            return userProfile;
        } catch (err) {
            HandlePostgressError(err.code, err.message);
        }
    }
}
