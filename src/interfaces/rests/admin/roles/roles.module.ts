import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapUserRoleRepository } from 'src/applications/repositories/map-user-role.repository';
import { RolesRepository } from 'src/applications/repositories/roles.repository';
import { RolesService } from 'src/applications/services/roles.service';
import { RolesUsecase } from 'src/applications/usecases/domain/admin/roles.usecase';
import { AccountModule } from '../account/account.module';
import { RolesController } from './roles.controller';
import { RolesTransformers } from './roles.transformer';

@Module({
    imports: [
        AccountModule,
        TypeOrmModule.forFeature([RolesRepository, MapUserRoleRepository]),
    ],
    controllers: [RolesController],
    providers: [
        // Usecase...
        RolesUsecase,
        // Services...
        RolesService,
        // Transformers...
        RolesTransformers,
    ],
    exports: [TypeOrmModule],
})
export class RolesModule {}
