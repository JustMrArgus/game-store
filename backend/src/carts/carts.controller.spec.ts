import { Test, TestingModule } from '@nestjs/testing';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';

describe('CartsController', () => {
  let controller: CartsController;

  const mockCartsService = {
    getAllCarts: jest.fn(),
    getCart: jest.fn(),
    deleteCart: jest.fn(),
    createCartItem: jest.fn(),
    getCartItem: jest.fn(),
    deleteCartItem: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartsController],
      providers: [{ provide: CartsService, useValue: mockCartsService }],
    }).compile();

    controller = module.get<CartsController>(CartsController);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllCarts', () => {
    it('should return all carts', async () => {
      const mockCarts = {
        status: 'success',
        data: [
          { id: 1, userId: 1, items: [] },
          { id: 2, userId: 2, items: [] },
        ],
      };
      mockCartsService.getAllCarts.mockResolvedValue(mockCarts);

      const result = await controller.getAllCarts();

      expect(result).toEqual(mockCarts);
      expect(mockCartsService.getAllCarts).toHaveBeenCalled();
    });
  });

  describe('getCart', () => {
    it('should return a cart by id', async () => {
      const mockCart = {
        status: 'success',
        data: { id: 1, userId: 1, items: [] },
      };
      mockCartsService.getCart.mockResolvedValue(mockCart);

      const result = await controller.getCart(1);

      expect(result).toEqual(mockCart);
      expect(mockCartsService.getCart).toHaveBeenCalledWith(1);
    });
  });

  describe('deleteCart', () => {
    it('should delete a cart', async () => {
      mockCartsService.deleteCart.mockResolvedValue({ status: 'success' });

      const result = await controller.deleteCart(1);

      expect(result).toEqual({ status: 'success' });
      expect(mockCartsService.deleteCart).toHaveBeenCalledWith(1);
    });
  });

  describe('createCartItem', () => {
    it('should create a cart item', async () => {
      const createCartItemDto = { cartId: 1, gameId: 1 };
      const mockCartItem = {
        status: 'success',
        data: { cartId: 1, gameId: 1, quantity: 1, price: '59.99' },
      };
      mockCartsService.createCartItem.mockResolvedValue(mockCartItem);

      const result = await controller.createCartItem(createCartItemDto);

      expect(result).toEqual(mockCartItem);
      expect(mockCartsService.createCartItem).toHaveBeenCalledWith(
        createCartItemDto,
      );
    });
  });

  describe('getCartItem', () => {
    it('should return a cart item', async () => {
      const mockCartItem = {
        status: 'success',
        data: { cartId: 1, gameId: 1, quantity: 1, price: '59.99' },
      };
      mockCartsService.getCartItem.mockResolvedValue(mockCartItem);

      const result = await controller.getCartItem(1, 1);

      expect(result).toEqual(mockCartItem);
      expect(mockCartsService.getCartItem).toHaveBeenCalledWith(1, 1);
    });
  });

  describe('deleteCartItem', () => {
    it('should delete a cart item', async () => {
      mockCartsService.deleteCartItem.mockResolvedValue({ status: 'success' });

      const result = await controller.deleteCartItem(1, 1);

      expect(result).toEqual({ status: 'success' });
      expect(mockCartsService.deleteCartItem).toHaveBeenCalledWith(1, 1);
    });
  });
});
