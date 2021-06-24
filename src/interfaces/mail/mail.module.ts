import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { BULL_QUEUE_NAME } from 'src/dictionaries/constant.dictionary';
import { MailProcessor } from './mail.processor';

@Module({
    imports: [
        MailerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (env: ConfigService) => ({
                transport: {
                    host: env.get('HOST_MAILER'),
                    secure: false,
                    auth: {
                        user: env.get('USER_MAILER'),
                        pass: env.get('PASSWORD_MAILER'),
                    },
                },
                defaults: {
                    from: env.get('FROM'),
                },
                template: {
                    dir: process.cwd() + env.get('TEMPLATE_DIR'),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
        }),
        BullModule.registerQueueAsync({
            name: BULL_QUEUE_NAME,
            inject: [ConfigService],
            useFactory: async (env: ConfigService) => ({
                redis: {
                    host: env.get('REDIS_HOST'),
                    port: env.get('REDIS_PORT'),
                },
            }),
        }),
    ],
    providers: [MailService, MailProcessor],
    exports: [MailService],
})
export class MailModule {}
