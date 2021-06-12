import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthRepository } from "src/databases/repositories/account/auth.repository";
import { RoleRepository } from "src/databases/repositories/account/role.repository";
import { RoleController } from "src/interfaces/rest/account/role.controller";
import { RolesUseCase } from "src/interfaces/usecases/account/role.usecase";

@Module({
    imports: [
        TypeOrmModule.forFeature([RoleRepository]),
        TypeOrmModule.forFeature([AuthRepository])
    ],
    controllers: [RoleController],
    providers: [RolesUseCase]
})
export class RoleHandler {}