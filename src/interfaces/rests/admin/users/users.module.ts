import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/applications/repositories/users.repository';
import { UserService } from 'src/applications/services/users.service';
import { UserUsecase } from 'src/applications/usecases/admin/users.usecase';
import { MailModule } from 'src/interfaces/mail/mail.module';
import { AuthenticationModule } from '../../auth/authentication/authentication.module';
import { ProfileModule } from '../profiles/profile.module';
import { RBACModule } from '../rbac/rbac.module';
import { UsersController } from './users.controller';
import { UsersTransformer } from './users.transformer';

@Module({
    imports: [
        forwardRef(() => ProfileModule),
        forwardRef(() => RBACModule),
        forwardRef(() => AuthenticationModule),
        MailModule,
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
