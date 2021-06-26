import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfilesRepository } from 'src/applications/repositories/user_profiles.repository';
import { UserProfilesService } from 'src/applications/services/user_profiles.service';
import { UserProfilesUsecase } from 'src/applications/usecases/admin/user_profiles.usecase';
import { UsersModule } from '../users/users.module';
import { ProfileController } from './profile.controller';
import { ProfileTransformer } from './profile.transformer';

@Module({
    imports: [
        forwardRef(() => UsersModule),
        TypeOrmModule.forFeature([UserProfilesRepository]),
    ],
    providers: [
        // Service
        UserProfilesService,
        // Usecase
        UserProfilesUsecase,
        // Transformer
        ProfileTransformer,
    ],
    controllers: [ProfileController],
    exports: [TypeOrmModule, UserProfilesService],
})
export class ProfileModule {}
