import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import {
    BULL_QUEUE_NAME,
    CONFIRMATION_REGISTRATION_EMAIL_QUEUE,
} from 'src/dictionaries/constant.dictionary';
import { UsersEntity } from 'src/infrastructures/database/postgres/entities/users.entity';

@Injectable()
export class MailService {
    constructor(
        @InjectQueue(BULL_QUEUE_NAME)
        private readonly queue: Queue,
    ) {}

    async sendConfirmationEmail(
        user: UsersEntity,
        token: string,
    ): Promise<boolean> {
        try {
            await this.queue.add(CONFIRMATION_REGISTRATION_EMAIL_QUEUE, {
                user,
                token,
            });

            return true;
        } catch (err) {
            return false;
        }
    }
}
