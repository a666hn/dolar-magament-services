import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

export class DbConnectionConfigurationClass {
    developmentAccount: TypeOrmModuleOptions = {
        type: 'postgres',
        host: process.env.DATABASE_HOST_ACCOUNT,
        port: Number(process.env.DATABASE_PORT_ACCOUNT),
        username: process.env.DATABASE_USER_ACCOUNT,
        password: process.env.DATABASE_PASSWORD_ACCOUNT,
        database: process.env.DATABASE_NAME_ACCOUNT,
        synchronize: true,
        autoLoadEntities: true,
        uuidExtension: 'uuid-ossp',
        entities: [
            path.join(__dirname, '..', 'entities', '**/*.entity{.ts, .js}'),
        ],
    };
}
