import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/applications/repositories/users.repository';
import { UserService } from 'src/applications/services/users.service';
import { UserUsecase } from 'src/applications/usecases/domain/admin/users.usecase';
import { ProfileModule } from '../profiles/profile.module';
import { AccountController } from './account.controller';
import { AccountTransformers } from './account.transformer';

@Module({
    imports: [
        forwardRef(() => ProfileModule),
        TypeOrmModule.forFeature([UsersRepository]),
    ],
    controllers: [AccountController],
    providers: [
        // Services...
        UserService,

        // Usecase...
        UserUsecase,

        // Transformers...
        AccountTransformers,
    ],
    exports: [TypeOrmModule],
})
export class AccountModule {}
