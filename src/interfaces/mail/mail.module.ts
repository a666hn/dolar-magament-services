import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';

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
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}
