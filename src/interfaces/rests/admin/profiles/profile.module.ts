import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/applications/repositories/users.repository';
import { UserProfilesRepository } from 'src/applications/repositories/user_profiles.repository';
import { UserProfilesService } from 'src/applications/services/user_profiles.service';
import { UserProfilesUsecase } from 'src/applications/usecases/domain/admin/user_profiles.usecase';
import { ProfileController } from './profile.controller';
import { ProfileTransformer } from './profile.transformer';

@Module({
    imports: [TypeOrmModule.forFeature([UserProfilesRepository, UsersRepository])],
    providers: [
        // Service
        UserProfilesService,
        // Usecase
        UserProfilesUsecase,
        // Transformer
        ProfileTransformer,
    ],
    controllers: [ProfileController],
})
export class ProfileModule {}
