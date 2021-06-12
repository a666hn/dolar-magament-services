import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthRepository } from "src/databases/repositories/account/auth.repository";
import { AuthController } from "src/interfaces/rest/account/auth.controller";
import { AuthUsecase } from "src/interfaces/usecases/account/auth.usecase";

@Module({
    imports: [
        TypeOrmModule.forFeature([AuthRepository])
    ],
    controllers: [AuthController],
    providers: [AuthUsecase],
    exports: [AuthUsecase]
})
export class AuthHandler {}