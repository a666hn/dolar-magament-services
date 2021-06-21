import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountRepository } from 'src/applications/repositories/users.repository';
import { UserProfilesRepository } from 'src/applications/repositories/user_profiles.repository';
import { UserService } from 'src/applications/services/users.service';
import { UserProfilesService } from 'src/applications/services/user_profiles.service';
import { UserUsecase } from 'src/applications/usecases/domain/admin/users.usecase';
import { UserProfilesUsecase } from 'src/applications/usecases/domain/admin/user_profiles.usecase';
import { AccountController } from './account.controller';
import { AccountTransformers } from './account.transformer';

@Module({
    imports: [
        TypeOrmModule.forFeature([AccountRepository, UserProfilesRepository]),
    ],
    controllers: [AccountController],
    providers: [
        // Services
        UserService,
        UserProfilesService,

        // Usecase
        UserUsecase,
        UserProfilesUsecase,

        // Transformers
        AccountTransformers,
    ],
})
export class AccountModule {}
