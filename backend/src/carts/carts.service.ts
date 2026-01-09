import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';

@Injectable()
export class CartsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCarts() {
    try {
      const carts = await this.prisma.cart.findMany({
        include: {
          items: {
            include: {
              game: true,
            },
          },
        },
      });
      return { status: 'success', data: carts };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getCart(cartId: number) {
    try {
      const cart = await this.prisma.cart.findUniqueOrThrow({
        where: { id: cartId },
        include: {
          items: {
            include: {
              game: true,
            },
          },
        },
      });
      return { status: 'success', data: cart };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Cart with id ${cartId} does not exist`);
      }
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async deleteCart(cartId: number) {
    try {
      await this.prisma.cart.delete({
        where: { id: cartId },
      });
      return { status: 'success' };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Cart with id ${cartId} does not exist`);
      }
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getCartItem(cartId: number, gameId: number) {
    try {
      const cartItem = await this.prisma.cartItem.findUniqueOrThrow({
        where: {
          cartId_gameId: {
            cartId: cartId,
            gameId: gameId,
          },
        },
      });

      return { status: 'success', data: cartItem };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Cart with id ${cartId} does not exist`);
      }
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async createCartItem(newCartItemData: CreateCartItemDto) {
    try {
      const game = await this.prisma.game.findUniqueOrThrow({
        where: { id: newCartItemData.gameId },
      });

      const existingCartItem = await this.prisma.cartItem.findUnique({
        where: {
          cartId_gameId: {
            cartId: newCartItemData.cartId,
            gameId: newCartItemData.gameId,
          },
        },
      });

      if (existingCartItem) {
        const updatedCartItem = await this.prisma.cartItem.update({
          data: { quantity: existingCartItem.quantity + 1 },
          where: {
            cartId_gameId: {
              cartId: newCartItemData.cartId,
              gameId: newCartItemData.gameId,
            },
          },
        });
        return { status: 'success', data: updatedCartItem };
      }

      const newCartItem = await this.prisma.cartItem.create({
        data: {
          cartId: newCartItemData.cartId,
          gameId: newCartItemData.gameId,
          quantity: 1,
          price: game.price,
        },
      });
      return { status: 'success', data: newCartItem };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async deleteCartItem(cartId: number, gameId: number) {
    try {
      await this.prisma.cartItem.delete({
        where: {
          cartId_gameId: {
            cartId: cartId,
            gameId: gameId,
          },
        },
      });

      return { status: 'success' };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(
          `Cart item with cartId ${cartId} and gameId ${gameId} does not exist`,
        );
      }
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
