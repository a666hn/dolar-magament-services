import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthStrategy } from 'src/core/auth-strategy/auth.strategy';
import { AuthRepository } from 'src/databases/repositories/account/auth.repository';
import { UsersUseCase } from 'src/databases/usecases/users.usecase';
import { AuthController } from 'src/interfaces/rest/account/auth.controller';
import { AuthTransformers } from 'src/interfaces/transformers/auth.transformer';
import { AuthUsecase } from 'src/interfaces/usecases/account/auth.usecase';
import { RegisterAuthModule } from './register-module';

@Module({
    imports: [
        ...RegisterAuthModule,
        TypeOrmModule.forFeature([AuthRepository]),
    ],
    controllers: [AuthController],
    providers: [AuthUsecase, AuthStrategy, AuthTransformers, UsersUseCase],
    exports: [AuthUsecase, PassportModule],
})
export class AuthHandler {}
