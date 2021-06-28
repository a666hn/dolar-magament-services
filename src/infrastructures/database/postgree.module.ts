import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import {
    HOST,
    NAME,
    PASSWORD,
    PORT,
    USERNAME,
} from 'src/dictionaries/constant.dictionary';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (env: ConfigService) => ({
                type: 'postgres',
                host: env.get(HOST),
                port: Number(env.get(PORT)),
                username: env.get(USERNAME),
                password: env.get(PASSWORD),
                database: env.get(NAME),
                synchronize: true,
                autoLoadEntities: true,
                uuidExtension: 'uuid-ossp',
                subscribers: [
                    join(
                        __dirname,
                        'postgres',
                        'subscribers',
                        '*.subscriber.{js,ts}',
                    ),
                ],
            }),
        }),
    ],
})
export class PostgreeModule {}
