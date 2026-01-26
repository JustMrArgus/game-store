import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';

@Injectable()
export class CartsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllCarts() {
    const carts = await this.prisma.cart.findMany({
      include: {
        items: {
          include: {
            game: true,
          },
        },
      },
    });
    return carts;
  }

  async getCart(cartId: number) {
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
    return cart;
  }

  async deleteCart(cartId: number) {
    await this.prisma.cart.delete({
      where: { id: cartId },
    });
  }

  async getCartItem(cartId: number, gameId: number) {
    const cartItem = await this.prisma.cartItem.findUniqueOrThrow({
      where: {
        cartId_gameId: {
          cartId: cartId,
          gameId: gameId,
        },
      },
    });

    return cartItem;
  }

  async createCartItem(newCartItemData: CreateCartItemDto) {
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
      return updatedCartItem;
    }

    const newCartItem = await this.prisma.cartItem.create({
      data: {
        cartId: newCartItemData.cartId,
        gameId: newCartItemData.gameId,
        quantity: 1,
        price: game.price,
      },
    });
    return newCartItem;
  }

  async deleteCartItem(cartId: number, gameId: number) {
    await this.prisma.cartItem.delete({
      where: {
        cartId_gameId: {
          cartId: cartId,
          gameId: gameId,
        },
      },
    });
  }
}
