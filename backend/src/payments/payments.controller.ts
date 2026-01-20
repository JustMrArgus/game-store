import {
  Controller,
  Post,
  Get,
  Req,
  Query,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ROLE } from '@prisma/client';
import type { Request } from 'express';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Roles(ROLE.ADMIN, ROLE.USER)
  @UseGuards(AuthGuard('jwt-at'), RolesGuard)
  @Post('checkout')
  async createCheckoutSession(@Req() req: Request & { user: { sub: number } }) {
    const userId = req.user.sub;
    return await this.paymentsService.createCheckoutSession(userId);
  }

  @Post('webhook')
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() req: Request,
  ) {
    const payload = (req as any).rawBody as Buffer;
    if (!payload) {
      throw new Error('No raw body found');
    }
    return await this.paymentsService.handleWebhook(signature, payload);
  }

  @Get('verify')
  async verifySession(@Query('session_id') sessionId: string) {
    return await this.paymentsService.verifySession(sessionId);
  }
}
