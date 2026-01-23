import { Test, TestingModule } from '@nestjs/testing';
import { CartsService } from './carts.service';
import { PrismaService } from '../prisma/prisma.service';

describe('CartsService', () => {
  let service: CartsService;

  const mockPrismaService = {
    cart: {
      findMany: jest.fn(),
      findUniqueOrThrow: jest.fn(),
      delete: jest.fn(),
    },
    cartItem: {
      findUniqueOrThrow: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    game: {
      findUniqueOrThrow: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<CartsService>(CartsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllCarts', () => {
    it('should return all carts with items', async () => {
      const mockCarts = [
        {
          id: 1,
          userId: 1,
          items: [
            {
              id: 1,
              cartId: 1,
              gameId: 1,
              quantity: 2,
              price: '59.99',
              game: { id: 1, title: 'Game 1' },
            },
          ],
        },
        {
          id: 2,
          userId: 2,
          items: [],
        },
      ];

      mockPrismaService.cart.findMany.mockResolvedValue(mockCarts);

      const result = await service.getAllCarts();

      expect(result.status).toBe('success');
      expect(result.data).toEqual(mockCarts);
      expect(result.data.length).toBe(2);
      expect(mockPrismaService.cart.findMany).toHaveBeenCalledWith({
        include: {
          items: {
            include: {
              game: true,
            },
          },
        },
      });
    });

    it('should return empty array when no carts exist', async () => {
      mockPrismaService.cart.findMany.mockResolvedValue([]);

      const result = await service.getAllCarts();

      expect(result.status).toBe('success');
      expect(result.data).toEqual([]);
    });
  });

  describe('getCart', () => {
    it('should return a cart by id with items', async () => {
      const mockCart = {
        id: 1,
        userId: 1,
        items: [
          {
            id: 1,
            cartId: 1,
            gameId: 1,
            quantity: 1,
            price: '59.99',
            game: { id: 1, title: 'Game 1' },
          },
        ],
      };

      mockPrismaService.cart.findUniqueOrThrow.mockResolvedValue(mockCart);

      const result = await service.getCart(1);

      expect(result.status).toBe('success');
      expect(result.data).toEqual(mockCart);
      expect(mockPrismaService.cart.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          items: {
            include: {
              game: true,
            },
          },
        },
      });
    });

    it('should throw when cart not found', async () => {
      mockPrismaService.cart.findUniqueOrThrow.mockRejectedValue(
        new Error('Record not found'),
      );

      await expect(service.getCart(999)).rejects.toThrow();
    });
  });

  describe('deleteCart', () => {
    it('should delete a cart successfully', async () => {
      mockPrismaService.cart.delete.mockResolvedValue({});

      const result = await service.deleteCart(1);

      expect(result.status).toBe('success');
      expect(mockPrismaService.cart.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw when deleting non-existent cart', async () => {
      mockPrismaService.cart.delete.mockRejectedValue(
        new Error('Record not found'),
      );

      await expect(service.deleteCart(999)).rejects.toThrow();
    });
  });

  describe('getCartItem', () => {
    it('should return a cart item by cartId and gameId', async () => {
      const mockCartItem = {
        id: 1,
        cartId: 1,
        gameId: 1,
        quantity: 2,
        price: '59.99',
      };

      mockPrismaService.cartItem.findUniqueOrThrow.mockResolvedValue(
        mockCartItem,
      );

      const result = await service.getCartItem(1, 1);

      expect(result.status).toBe('success');
      expect(result.data).toEqual(mockCartItem);
      expect(mockPrismaService.cartItem.findUniqueOrThrow).toHaveBeenCalledWith(
        {
          where: {
            cartId_gameId: {
              cartId: 1,
              gameId: 1,
            },
          },
        },
      );
    });

    it('should throw when cart item not found', async () => {
      mockPrismaService.cartItem.findUniqueOrThrow.mockRejectedValue(
        new Error('Record not found'),
      );

      await expect(service.getCartItem(1, 999)).rejects.toThrow();
    });
  });

  describe('createCartItem', () => {
    it('should create a new cart item', async () => {
      const createCartItemDto = {
        cartId: 1,
        gameId: 1,
      };

      const mockGame = {
        id: 1,
        title: 'Test Game',
        price: '59.99',
      };

      const mockCreatedCartItem = {
        id: 1,
        cartId: 1,
        gameId: 1,
        quantity: 1,
        price: '59.99',
      };

      mockPrismaService.game.findUniqueOrThrow.mockResolvedValue(mockGame);
      mockPrismaService.cartItem.findUnique.mockResolvedValue(null);
      mockPrismaService.cartItem.create.mockResolvedValue(mockCreatedCartItem);

      const result = await service.createCartItem(createCartItemDto);

      expect(result.status).toBe('success');
      expect(result.data).toEqual(mockCreatedCartItem);
      expect(result.data.quantity).toBe(1);
      expect(mockPrismaService.cartItem.create).toHaveBeenCalled();
    });

    it('should increment quantity if cart item already exists', async () => {
      const createCartItemDto = {
        cartId: 1,
        gameId: 1,
      };

      const mockGame = {
        id: 1,
        title: 'Test Game',
        price: '59.99',
      };

      const existingCartItem = {
        id: 1,
        cartId: 1,
        gameId: 1,
        quantity: 2,
        price: '59.99',
      };

      const updatedCartItem = {
        id: 1,
        cartId: 1,
        gameId: 1,
        quantity: 3,
        price: '59.99',
      };

      mockPrismaService.game.findUniqueOrThrow.mockResolvedValue(mockGame);
      mockPrismaService.cartItem.findUnique.mockResolvedValue(existingCartItem);
      mockPrismaService.cartItem.update.mockResolvedValue(updatedCartItem);

      const result = await service.createCartItem(createCartItemDto);

      expect(result.status).toBe('success');
      expect(result.data.quantity).toBe(3);
      expect(mockPrismaService.cartItem.update).toHaveBeenCalledWith({
        data: { quantity: 3 },
        where: {
          cartId_gameId: {
            cartId: 1,
            gameId: 1,
          },
        },
      });
    });

    it('should throw when game not found', async () => {
      const createCartItemDto = {
        cartId: 1,
        gameId: 999,
      };

      mockPrismaService.game.findUniqueOrThrow.mockRejectedValue(
        new Error('Record not found'),
      );

      await expect(service.createCartItem(createCartItemDto)).rejects.toThrow();
    });
  });

  describe('deleteCartItem', () => {
    it('should delete a cart item successfully', async () => {
      mockPrismaService.cartItem.delete.mockResolvedValue({});

      const result = await service.deleteCartItem(1, 1);

      expect(result.status).toBe('success');
      expect(mockPrismaService.cartItem.delete).toHaveBeenCalledWith({
        where: {
          cartId_gameId: {
            cartId: 1,
            gameId: 1,
          },
        },
      });
    });

    it('should throw when deleting non-existent cart item', async () => {
      mockPrismaService.cartItem.delete.mockRejectedValue(
        new Error('Record not found'),
      );

      await expect(service.deleteCartItem(1, 999)).rejects.toThrow();
    });
  });
});
