import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/applications/repositories/users.repository';
import { UserService } from 'src/applications/services/users.service';
import { UserUsecase } from 'src/applications/usecases/domain/admin/users.usecase';
import { AuthenticationModule } from '../../auth/authentication/authentication.module';
import { ProfileModule } from '../profiles/profile.module';
import { RolesModule } from '../roles/roles.module';
import { UsersController } from './users.controller';
import { UsersTransformer } from './users.transformer';

@Module({
    imports: [
        forwardRef(() => ProfileModule),
        forwardRef(() => RolesModule),
        forwardRef(() => AuthenticationModule),
        TypeOrmModule.forFeature([UsersRepository]),
    ],
    controllers: [UsersController],
    providers: [
        // Services...
        UserService,

        // Usecase...
        UserUsecase,

        // Transformers...
        UsersTransformer,
    ],
    exports: [TypeOrmModule, UserUsecase, UserService],
})
export class UsersModule {}
