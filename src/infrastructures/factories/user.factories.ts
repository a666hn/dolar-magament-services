import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { UsersEntity } from '../database/postgres/entities/users.entity';
import { ACCOUNT_STATUS } from 'src/globals/global.enum';

// const usersData: UsersEntity[] = [
//     {
//         name: 'Adi Hermawan',
//         email: 'adidot78@gmail.com',
//         username: 'a666hn',
//         password: 'Kancutmeong08',
//     },
//     {
//         name: 'Anisa Bella Indriani',
//         email: 'anisyabellaindriani@gmail.com',
//         username: 'anisa',
//         password: 'Kancutmeong08',
//     },
//     {
//         name: 'Giandra Putra Hermawan',
//         email: 'giandra@mail.com',
//         username: 'giandra',
//         password: 'Kancutmeong08',
//     },
// ];

define(UsersEntity, (faker: typeof Faker): any => {
    const user = new UsersEntity();

    user.name = faker.name.firstName();
    user.email = faker.internet.email();
    user.username = faker.internet.userName();
    user.password = 'Kancutmeong08';
    user.isEmailVerified = false;
    user.accountStatus = ACCOUNT_STATUS.REGISTERED;

    return user;
});
