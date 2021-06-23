import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from 'src/applications/services/roles.service';
import { RolesUsecase } from 'src/applications/usecases/domain/admin/roles.usecase';
import { ModuleNeedForRBAC } from './module.list';
import { RolesController } from './roles/roles.controller';
import { RolesTransformers } from './roles/roles.transformer';

@Module({
    imports: ModuleNeedForRBAC,
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
export class RBACModule {}
