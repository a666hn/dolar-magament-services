import { ACCOUNT_STATUS } from '../../globals/global.enum';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { UsersEntity } from '../database/postgres/entities/users.entity';
import { Logger } from '@nestjs/common';
import { UserProfilesEntity } from '../database/postgres/entities/user_profiles.entity';

const users: UsersEntity[] = [
    {
        name: 'Adi Hermawan',
        email: 'adidot78@gmail.com',
        password: 'password123',
        username: 'a666hn',
        accountStatus: ACCOUNT_STATUS.REGISTERED,
        isEmailVerified: false,
    },
    {
        name: 'Anisa Bella Indriani',
        email: 'anisyabellaindriani@gmail.com',
        password: 'password123',
        username: 'anisa',
        accountStatus: ACCOUNT_STATUS.REGISTERED,
        isEmailVerified: false,
    },
    {
        name: 'Giandra Putra Hermawan',
        email: 'gian@mail.com',
        password: 'password123',
        username: 'gian',
        accountStatus: ACCOUNT_STATUS.REGISTERED,
        isEmailVerified: false,
    },
];

export default class CreateUser_1617814860000 implements Seeder {
    private readonly logger = new Logger(this.constructor.name);
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const { manager } = connection;

        try {
            const foundProfile = await manager.find(UserProfilesEntity);
            const foundUser = await manager.find(UsersEntity);

            if (foundUser.length > 0) {
                this.logger.debug(
                    `Make sure you have empty data for users table. Got ${foundUser.length} data...`,
                );
                return;
            }

            if (foundProfile.length < 1) {
                this.logger.debug(
                    `Make sure you have data in user_profile table. Got ${foundProfile.length} data...`,
                );
                return;
            }

            for (let i = 0; i < users.length; i += 1) {
                const profile = foundProfile[i];
                const userData = users[i];

                const user = manager.create(UsersEntity, {
                    name: userData.name,
                    email: userData.email,
                    username: userData.username,
                    isEmailVerified: false,
                    accountStatus: ACCOUNT_STATUS.REGISTERED,
                    profileId: profile.id,
                });

                await manager.save(UsersEntity, user);
            }
        } catch (err) {
            this.logger.error(err);
            return;
        }
    }
}
