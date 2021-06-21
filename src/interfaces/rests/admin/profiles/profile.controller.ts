import { Controller, Get, Param } from '@nestjs/common';
import { UserProfilesUsecase } from 'src/applications/usecases/domain/admin/user_profiles.usecase';
import { PROFILE_URL, VERSION_1 } from 'src/dictionaries/constant.dictionary';
import { DataResponse } from 'src/globals/global.interface';
import { ProfileResponse } from './interfaces/profile.interface';
import { ProfileTransformer } from './profile.transformer';

@Controller(`/${VERSION_1}/${PROFILE_URL}`)
export class ProfileController {
    constructor(
        private readonly profileUsecase: UserProfilesUsecase,
        private readonly profileTransformer: ProfileTransformer,
    ) {}

    @Get('/:id')
    async GetProfileById(@Param('id') id: string): Promise<DataResponse<ProfileResponse>> {
        const profile = await this.profileUsecase.GetProfileById(id);

        return this.profileTransformer.transformUserProfile(profile);
    }
}
