import {
    Processor,
    OnQueueActive,
    OnQueueCompleted,
    OnQueueFailed,
    Process,
} from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import {
    BULL_QUEUE_NAME,
    CONFIRMATION_REGISTRATION_EMAIL_QUEUE,
} from 'src/dictionaries/constant.dictionary';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersEntity } from 'src/infrastructures/database/postgres/entities/users.entity';

@Processor(BULL_QUEUE_NAME)
export class MailProcessor {
    private readonly logger = new Logger(this.constructor.name);

    constructor(private readonly mailerService: MailerService) {}

    @OnQueueActive()
    onActive(job: Job) {
        this.logger.debug(
            `Processing job ${job.id} of type ${
                job.name
            }. Data: ${JSON.stringify(job.data)}`,
        );
    }

    @OnQueueCompleted()
    onComplete(job: Job, result: any) {
        this.logger.debug(
            `Completed job ${job.id} of type ${
                job.name
            }. Result: ${JSON.stringify(result)}`,
        );
    }

    @OnQueueFailed()
    onError(job: Job<any>, error: any) {
        this.logger.error(
            `Failed job ${job.id} of type ${job.name}: ${error.message}`,
            error.stack,
        );
    }

    @Process(CONFIRMATION_REGISTRATION_EMAIL_QUEUE)
    async sendConfirmationEmail(
        job: Job<{ user: UsersEntity; token: string }>,
    ) {
        this.logger.log(
            `Sending confirmation email to '${job.data.user.email}'`,
        );

        const url = `http://localhost:6667/email/verification?id=${job.data.user.id}&token=${job.data.token}`;

        try {
            await this.mailerService.sendMail({
                to: job.data.user.email,
                subject: 'Welcome to Nice App! Confirm your Email',
                template: './confirmation',
                context: {
                    name: job.data.user.name,
                    url,
                },
            });
        } catch (err) {
            this.logger.error(
                `Failed to send confirmation email to '${job.data.user.email}'`,
                err.stack,
            );
            throw err;
        }
    }
}
