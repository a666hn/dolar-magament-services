import { Module } from '@nestjs/common';
import { RolesService } from 'src/applications/services/roles.service';
import { RolesUsecase } from 'src/applications/usecases/domain/admin/roles.usecase';
import { RolesController } from './roles.controller';
import { RolesTransformers } from './roles.transformer';

@Module({
    controllers: [RolesController],
    providers: [
        // Usecase...
        RolesUsecase,
        // Services...
        RolesService,
        // Transformers...
        RolesTransformers,
    ],
})
export class RolesModule {}
