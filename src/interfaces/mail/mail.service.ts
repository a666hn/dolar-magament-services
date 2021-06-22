import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersEntity } from 'src/infrastructures/database/postgres/entities/users.entity';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendConfirmationEmail(
        user: UsersEntity,
        token: string,
    ): Promise<void> {
        const url = `http://localhost:6667/email/verification?id=${user.id}&token=${token}`;

        try {
            await this.mailerService.sendMail({
                to: user.email,
                subject: 'Welcome to Nice App! Confirm your Email',
                template: './confirmation',
                context: {
                    name: user.name,
                    url,
                },
            });
        } catch (err) {
            throw new InternalServerErrorException(
                'Ada sesuatu yang salah. Silahkan menghubungi admin kami',
            );
        }
    }
}
