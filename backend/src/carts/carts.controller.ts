import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ROLE } from '@prisma/client';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Roles(ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  async getAllCarts() {
    return await this.cartsService.getAllCarts();
  }

  @Roles(ROLE.ADMIN, ROLE.USER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get(':cartId')
  async getCart(@Param('cartId', ParseIntPipe) cartId: number) {
    return await this.cartsService.getCart(cartId);
  }

  @Roles(ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':cartId')
  async deleteCart(@Param('cartId', ParseIntPipe) cartId: number) {
    return await this.cartsService.deleteCart(cartId);
  }

  @Roles(ROLE.ADMIN, ROLE.USER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('items')
  async createCartItem(@Body() newCartItem: CreateCartItemDto) {
    return await this.cartsService.createCartItem(newCartItem);
  }

  @Roles(ROLE.ADMIN, ROLE.USER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get(':cartId/items/:gameId')
  async getCartItem(
    @Param('cartId', ParseIntPipe) cartId: number,
    @Param('gameId', ParseIntPipe) gameId: number,
  ) {
    return await this.cartsService.getCartItem(cartId, gameId);
  }

  @Roles(ROLE.ADMIN, ROLE.USER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':cartId/items/:gameId')
  async deleteCartItem(
    @Param('cartId', ParseIntPipe) cartId: number,
    @Param('gameId', ParseIntPipe) gameId: number,
  ) {
    return await this.cartsService.deleteCartItem(cartId, gameId);
  }
}
