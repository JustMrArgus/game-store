import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get()
  async getAllCarts() {
    return await this.cartsService.getAllCarts();
  }

  @Get(':cartId')
  async getCart(@Param('cartId', ParseIntPipe) cartId: number) {
    return await this.cartsService.getCart(cartId);
  }

  @Delete(':cartId')
  async deleteCart(@Param('cartId', ParseIntPipe) cartId: number) {
    return await this.cartsService.deleteCart(cartId);
  }

  @Post('items')
  async createCartItem(@Body() newCartItem: CreateCartItemDto) {
    return await this.cartsService.createCartItem(newCartItem);
  }

  @Get(':cartId/items/:gameId')
  async getCartItem(
    @Param('cartId', ParseIntPipe) cartId: number,
    @Param('gameId', ParseIntPipe) gameId: number,
  ) {
    return await this.cartsService.getCartItem(cartId, gameId);
  }

  @Delete(':cartId/items/:gameId')
  async deleteCartItem(
    @Param('cartId', ParseIntPipe) cartId: number,
    @Param('gameId', ParseIntPipe) gameId: number,
  ) {
    return await this.cartsService.deleteCartItem(cartId, gameId);
  }
}
