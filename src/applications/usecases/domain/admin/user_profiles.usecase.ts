import { Injectable } from '@nestjs/common';
import { UserProfilesService } from 'src/applications/services/user_profiles.service';
import { UsersEntity } from 'src/infrastructures/database/postgres/entities/users.entity';

@Injectable()
export class UserProfilesUsecase {
    constructor(private readonly userProfileService: UserProfilesService) {}

    async GetProfileById(id: string): Promise<UsersEntity> {
        return this.userProfileService.GetProfileById(id);
    }
}
