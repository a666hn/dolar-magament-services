import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfilesRepository } from 'src/applications/repositories/user_profiles.repository';
import { UserProfilesService } from 'src/applications/services/user_profiles.service';
import { UserProfilesUsecase } from 'src/applications/usecases/domain/admin/user_profiles.usecase';
import { AccountModule } from '../account/account.module';
import { ProfileController } from './profile.controller';
import { ProfileTransformer } from './profile.transformer';

@Module({
    imports: [
        forwardRef(() => AccountModule),
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
    exports: [TypeOrmModule],
})
export class ProfileModule {}
