import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (env: ConfigService) => ({
                type: 'postgres',
                host: env.get('APP_HOST'),
                port: Number(env.get('DATABASE_PORT_ACCOUNT')),
                username: env.get('DATABASE_USER_ACCOUNT'),
                password: env.get('DATABASE_PASSWORD_ACCOUNT'),
                database: env.get('DATABASE_NAME_ACCOUNT'),
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
