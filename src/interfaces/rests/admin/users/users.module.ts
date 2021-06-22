import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/applications/repositories/users.repository';
import { UserService } from 'src/applications/services/users.service';
import { UserUsecase } from 'src/applications/usecases/domain/admin/users.usecase';
import { ProfileModule } from '../profiles/profile.module';
import { UsersController } from './users.controller';
import { UsersTransformer } from './users.transformer';

@Module({
    imports: [
        forwardRef(() => ProfileModule),
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
    exports: [TypeOrmModule],
})
export class UsersModule {}
