import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissionRepository } from "src/databases/repositories/account/permission.repository";

@Module({
    imports: [TypeOrmModule.forFeature([PermissionRepository])]
})
export class PermissionHandler {}