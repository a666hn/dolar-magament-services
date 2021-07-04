import { Logger } from '@nestjs/common';
import { Factory, Seeder } from 'typeorm-seeding';
import * as Faker from 'faker';
import { Connection } from 'typeorm';
import { UserProfilesEntity } from '../database/postgres/entities/user_profiles.entity';

export default class CreateUserProfile_1617814800000 implements Seeder {
    private readonly logger = new Logger(this.constructor.name);
    private readonly fucker = Faker;

    async run(factory: Factory, connection: Connection): Promise<void> {
        const { manager } = connection;

        try {
            const foundProfile = await manager.find(UserProfilesEntity);

            if (foundProfile.length > 0) {
                this.logger.debug(
                    `Make sure you have empty user_profile data in table user_profile. Got ${foundProfile.length} data`,
                );
                return;
            }

            for (let i = 0; i < 5; i += 1) {
                const profile = manager.create(UserProfilesEntity, {
                    bio: this.fucker.name.firstName(),
                    phoneNumber: this.fucker.phone.phoneNumber(),
                    address: this.fucker.address.streetAddress(true),
                });

                await manager.save(UserProfilesEntity, profile);
            }
        } catch (err) {
            this.logger.error(err);
            return;
        }
    }
}
