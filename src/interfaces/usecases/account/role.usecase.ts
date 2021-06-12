import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RolesEntity } from "src/databases/entities/roles.entity";
import { AuthRepository } from "src/databases/repositories/account/auth.repository";
import { RoleRepository } from "src/databases/repositories/account/role.repository";
import { AddRoleDto } from "src/interfaces/dto/account/role.dto";
import { AuthUsecase } from "./auth.usecase";

@Injectable()
export class RolesUseCase {
    constructor(
        @InjectRepository(RoleRepository)
        private roleRepository: RoleRepository,
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository
    ) {}

    async RegisterRole(roleDto: AddRoleDto): Promise<RolesEntity> {
        return this.roleRepository.AddNewRole(roleDto);
    }

    async UpdateRole(id: string, description: string): Promise<RolesEntity> {
        const role = await this.roleRepository.findOne(id);

        if (!role) {
            throw new NotFoundException(`Cannot found role with id ${id}`);
        }

        return this.roleRepository.UpdateRole(role, description);
    }

    async DeleteRole(id: string): Promise<void> {
        const role = await this.roleRepository.delete(id);

        if (role.affected < 1) {
            throw new NotFoundException(`Cannot found role with id ${id}`)
        }
    }

    async AssignRoleToUser(userId: string, roleId: string): Promise<RolesEntity> {
        const user = await this.authRepository.findOne(userId);
        const role = await this.roleRepository.findOne(roleId);

        if (!user) {
            throw new NotFoundException(`Cannot found role with id ${userId}`)
        }

        if (!role) {
            throw new NotFoundException(`Cannot found role with id ${roleId}`)
        }

        return this.roleRepository.AssignRoleToUser(role, user);
    }
}