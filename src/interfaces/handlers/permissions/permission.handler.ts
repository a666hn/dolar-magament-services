import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsEntity } from 'src/databases/entities/permissions.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PermissionsEntity])],
})
export class PermissionHandler {}
