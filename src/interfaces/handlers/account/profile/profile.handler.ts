import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserProfileRepository } from "src/databases/repositories/account/user_profile.repository";

@Module({
    imports: [TypeOrmModule.forFeature([UserProfileRepository])]
})
export class ProfileHandler {}