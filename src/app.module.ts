import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { CoreModule } from './core/core.module';
import { AppController } from './app.controller';
import { PostgreeModule } from './infrastructures/database/postgree.module';

dotenv.config();

@Module({
    imports: [
        // will make the .env properties available throughout the application.
        ConfigModule.forRoot({ isGlobal: true }),
        PostgreeModule,
        CoreModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
