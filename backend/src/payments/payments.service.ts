import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/email/email.service';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {
    this.stripe = new Stripe(
      this.configService.getOrThrow<string>('STRIPE_SECRET_KEY'),
    );
  }

  async createCheckoutSession(userId: number) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      include: {
        cart: {
          include: {
            items: {
              include: {
                game: {
                  select: {
                    id: true,
                    title: true,
                    keys: true,
                    quantity: true,
                    primaryImage: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user.cart || user.cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    for (const item of user.cart.items) {
      if (item.game.keys.length < item.quantity) {
        throw new BadRequestException(
          `Insufficient keys for game "${item.game.title}"`,
        );
      }
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      user.cart.items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.game.title,
            images: item.game.primaryImage ? [item.game.primaryImage] : [],
          },
          unit_amount: Math.round(Number(item.price) * 100),
        },
        quantity: item.quantity,
      }));

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${this.configService.get<string>('FRONTEND_URL')}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${this.configService.get<string>('FRONTEND_URL')}/payment/cancel`,
      metadata: {
        userId: userId.toString(),
        cartId: user.cart.id.toString(),
      },
      customer_email: user.email,
    });

    return {
      status: 'success',
      sessionId: session.id,
      url: session.url,
    };
  }

  async handleWebhook(signature: string, payload: Buffer) {
    const webhookSecret = this.configService.getOrThrow<string>(
      'STRIPE_WEBHOOK_SECRET',
    );

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret,
      );
    } catch (error) {
      throw new BadRequestException('Webhook signature verification failed');
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      await this.fulfillOrder(session);
    }

    return { received: true };
  }

  private async fulfillOrder(session: Stripe.Checkout.Session) {
    const userId = parseInt(session.metadata?.userId || '0');
    const cartId = parseInt(session.metadata?.cartId || '0');

    if (!userId || !cartId) {
      return;
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return;
    }

    const cartItems = await this.prisma.cartItem.findMany({
      where: { cartId },
      include: {
        game: {
          select: {
            id: true,
            title: true,
            keys: true,
            quantity: true,
            primaryImage: true,
          },
        },
      },
    });

    const purchasedGames: { gameTitle: string; gameKey: string }[] = [];

    for (const item of cartItems) {
      const keysToAssign = item.game.keys.slice(0, item.quantity);
      const remainingKeys = item.game.keys.slice(item.quantity);

      keysToAssign.forEach((key) => {
        purchasedGames.push({
          gameTitle: item.game.title,
          gameKey: key,
        });
      });

      await this.prisma.game.update({
        where: { id: item.game.id },
        data: {
          keys: remainingKeys,
          quantity: item.game.quantity - item.quantity,
        },
      });
    }

    await this.prisma.cartItem.deleteMany({
      where: { cartId },
    });

    try {
      await this.emailService.sendPurchaseConfirmation(
        user.email,
        user.name,
        purchasedGames,
      );
    } catch (error) {}
  }

  async verifySession(sessionId: string) {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId);
      return {
        status: 'success',
        paymentStatus: session.payment_status,
        customerEmail: session.customer_email,
      };
    } catch {
      throw new BadRequestException('Invalid session ID');
    }
  }
}
