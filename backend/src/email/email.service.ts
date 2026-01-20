import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

export interface GameKeyInfo {
  gameTitle: string;
  gameKey: string;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendPurchaseConfirmation(
    email: string,
    userName: string,
    games: GameKeyInfo[],
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Your purchase Game Store - Activation keys',
      template: 'purchase-confirmation',
      context: {
        userName,
        games,
      },
    });
  }
}
