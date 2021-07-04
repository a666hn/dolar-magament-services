/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    type: 'postgres',
    host: process.env.APP_HOST,
    port: process.env.DATABASE_PORT_ACCOUNT,
    username: process.env.DATABASE_USER_ACCOUNT,
    password: process.env.DATABASE_PASSWORD_ACCOUNT,
    database: process.env.DATABASE_NAME_ACCOUNT,
    synchronize: true,
    autoLoadEntities: true,
    uuidExtension: 'uuid-ossp',
    entities: [
        'dist/infrastructures/database/postgres/entities/*.entity{.ts,.js}',
    ],
    subscribers: [
        'dist/infrastructures/database/postgres/subscribers/*.subscriber{.ts,.js}',
    ],
    seeds: ['dist/infrastructures/seeder/*.seeder{.ts,.js}'],
    factories: ['dist/infrastructures/factories/*.factories{.ts,.js}'],
};
