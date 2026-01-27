import { Test, TestingModule } from '@nestjs/testing';
import { GamesService } from './games.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UpdateGameDto } from './dto/update-game.dto';

describe('GamesService', () => {
  let service: GamesService;

  const mockPrismaService = {
    game: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUniqueOrThrow: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
  };

  const createMockGameDto = (): CreateGameDto => ({
    keys: ['KEY-001', 'KEY-002'],
    quantity: 2,
    title: 'Test Game',
    genre: 'Test genre',
    buyCount: 0,
    description: 'A test game description',
    trailer: 'https://example.com/trailer',
    primaryImage: 'https://example.com/image.jpg',
    additionalImages: ['https://example.com/img1.jpg'],
    logo: 'https://example.com/logo.png',
    price: '59.99',
    developer: 'Test Developer',
    publisher: 'Test Publisher',
    releaseDate: '2025-01-01',
    platforms: ['PC', 'PS5'],
    minOS: 'Windows 10',
    minCPU: 'Intel i5',
    minMemory: '8GB',
    minGPU: 'GTX 1060',
    minStorage: '50GB',
    recOS: 'Windows 11',
    recCPU: 'Intel i7',
    recMemory: '16GB',
    recGPU: 'RTX 3060',
    recStorage: '100GB',
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamesService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<GamesService>(GamesService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createGame', () => {
    it('should create a new game successfully', async () => {
      const createGameDto = createMockGameDto();

      const mockCreatedGame = {
        id: 1,
        ...createGameDto,
      };

      mockPrismaService.game.create.mockResolvedValue(mockCreatedGame);

      const result = await service.createGame(createGameDto);

      expect(result).toEqual(mockCreatedGame);
      expect(mockPrismaService.game.create).toHaveBeenCalledWith({
        data: createGameDto,
      });
    });

    it('should create a game with all required fields', async () => {
      const createGameDto = createMockGameDto();

      mockPrismaService.game.create.mockResolvedValue({
        id: 1,
        ...createGameDto,
      });

      const result = await service.createGame(createGameDto);

      expect(result.title).toBe('Test Game');
      expect(result.price).toBe('59.99');
    });
  });

  describe('getAllGames', () => {
    it('should return all games with pagination', async () => {
      const mockGames = [
        {
          id: 1,
          title: 'Game 1',
          price: '59.99',
          quantity: 5,
        },
        {
          id: 2,
          title: 'Game 2',
          price: '49.99',
          quantity: 3,
        },
      ];

      mockPrismaService.game.findMany.mockResolvedValue(mockGames);
      mockPrismaService.game.count.mockResolvedValue(2);

      const query = { page: 1, limit: 10 };
      const result = await service.getAllGames(query);

      expect(result.items).toEqual(mockGames);
      expect(result.items.length).toBe(2);
      expect(result.meta.total).toBe(2);
      expect(result.meta.page).toBe(1);
      expect(result.meta.limit).toBe(10);
    });

    it('should return empty array when no games exist', async () => {
      mockPrismaService.game.findMany.mockResolvedValue([]);
      mockPrismaService.game.count.mockResolvedValue(0);

      const query = { page: 1, limit: 10 };
      const result = await service.getAllGames(query);

      expect(result.items).toEqual([]);
      expect(result.meta.total).toBe(0);
    });

    it('should filter games by genre', async () => {
      const mockGames = [{ id: 1, title: 'Action Game', genre: 'Action' }];

      mockPrismaService.game.findMany.mockResolvedValue(mockGames);
      mockPrismaService.game.count.mockResolvedValue(1);

      const query = { page: 1, limit: 10, genre: 'Action' };
      const result = await service.getAllGames(query);

      expect(result.items).toEqual(mockGames);
      expect(mockPrismaService.game.findMany).toHaveBeenCalled();
    });

    it('should search games by title', async () => {
      const mockGames = [{ id: 1, title: 'Test Game' }];

      mockPrismaService.game.findMany.mockResolvedValue(mockGames);
      mockPrismaService.game.count.mockResolvedValue(1);

      const query = { page: 1, limit: 10, search: 'Test' };
      const result = await service.getAllGames(query);

      expect(result.items).toEqual(mockGames);
      expect(mockPrismaService.game.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            title: { contains: 'Test', mode: 'insensitive' },
          }),
        }),
      );
    });

    it('should filter games by platforms', async () => {
      const mockGames = [
        { id: 1, title: 'PC Game', platforms: ['PC'] },
        { id: 2, title: 'Multi-platform Game', platforms: ['PC', 'PS5'] },
      ];

      mockPrismaService.game.findMany.mockResolvedValue(mockGames);
      mockPrismaService.game.count.mockResolvedValue(2);

      const query = { page: 1, limit: 10, platforms: ['PC'] };
      const result = await service.getAllGames(query);

      expect(result.items).toEqual(mockGames);
      expect(mockPrismaService.game.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            platforms: { hasSome: ['PC'] },
          }),
        }),
      );
    });

    it('should filter games by minPrice', async () => {
      const mockGames = [{ id: 1, title: 'Expensive Game', price: '59.99' }];

      mockPrismaService.game.findMany.mockResolvedValue(mockGames);
      mockPrismaService.game.count.mockResolvedValue(1);

      const query = { page: 1, limit: 10, minPrice: '50.00' };
      const result = await service.getAllGames(query);

      expect(result.items).toEqual(mockGames);
      expect(mockPrismaService.game.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            price: expect.objectContaining({
              gte: expect.anything(),
            }),
          }),
        }),
      );
    });

    it('should filter games by maxPrice', async () => {
      const mockGames = [{ id: 1, title: 'Cheap Game', price: '19.99' }];

      mockPrismaService.game.findMany.mockResolvedValue(mockGames);
      mockPrismaService.game.count.mockResolvedValue(1);

      const query = { page: 1, limit: 10, maxPrice: '30.00' };
      const result = await service.getAllGames(query);

      expect(result.items).toEqual(mockGames);
      expect(mockPrismaService.game.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            price: expect.objectContaining({
              lte: expect.anything(),
            }),
          }),
        }),
      );
    });

    it('should filter games by price range', async () => {
      const mockGames = [{ id: 1, title: 'Mid-priced Game', price: '39.99' }];

      mockPrismaService.game.findMany.mockResolvedValue(mockGames);
      mockPrismaService.game.count.mockResolvedValue(1);

      const query = {
        page: 1,
        limit: 10,
        minPrice: '20.00',
        maxPrice: '50.00',
      };
      const result = await service.getAllGames(query);

      expect(result.items).toEqual(mockGames);
      expect(mockPrismaService.game.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            price: expect.objectContaining({
              gte: expect.anything(),
              lte: expect.anything(),
            }),
          }),
        }),
      );
    });

    it('should sort games by title ascending', async () => {
      const mockGames = [
        { id: 1, title: 'Alpha Game' },
        { id: 2, title: 'Beta Game' },
      ];

      mockPrismaService.game.findMany.mockResolvedValue(mockGames);
      mockPrismaService.game.count.mockResolvedValue(2);

      const query = {
        page: 1,
        limit: 10,
        sortBy: 'title',
        sortOrder: 'asc' as const,
      };
      const result = await service.getAllGames(query);

      expect(result.items).toEqual(mockGames);
      expect(mockPrismaService.game.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { title: 'asc' },
        }),
      );
    });

    it('should sort games by price descending', async () => {
      const mockGames = [
        { id: 1, title: 'Expensive Game', price: '59.99' },
        { id: 2, title: 'Cheap Game', price: '19.99' },
      ];

      mockPrismaService.game.findMany.mockResolvedValue(mockGames);
      mockPrismaService.game.count.mockResolvedValue(2);

      const query = {
        page: 1,
        limit: 10,
        sortBy: 'price',
        sortOrder: 'desc' as const,
      };
      const result = await service.getAllGames(query);

      expect(result.items).toEqual(mockGames);
      expect(mockPrismaService.game.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { price: 'desc' },
        }),
      );
    });

    it('should sort games by buyCount', async () => {
      const mockGames = [
        { id: 1, title: 'Popular Game', buyCount: 1000 },
        { id: 2, title: 'New Game', buyCount: 10 },
      ];

      mockPrismaService.game.findMany.mockResolvedValue(mockGames);
      mockPrismaService.game.count.mockResolvedValue(2);

      const query = {
        page: 1,
        limit: 10,
        sortBy: 'buyCount',
        sortOrder: 'desc' as const,
      };
      const result = await service.getAllGames(query);

      expect(result.items).toEqual(mockGames);
      expect(mockPrismaService.game.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { buyCount: 'desc' },
        }),
      );
    });

    it('should apply multiple filters together', async () => {
      const mockGames = [
        {
          id: 1,
          title: 'Action PC Game',
          genre: 'Action',
          platforms: ['PC'],
          price: '29.99',
        },
      ];

      mockPrismaService.game.findMany.mockResolvedValue(mockGames);
      mockPrismaService.game.count.mockResolvedValue(1);

      const query = {
        page: 1,
        limit: 10,
        genre: 'Action',
        search: 'Action',
        platforms: ['PC'],
        minPrice: '20.00',
        maxPrice: '40.00',
        sortBy: 'price',
        sortOrder: 'asc' as const,
      };
      const result = await service.getAllGames(query);

      expect(result.items).toEqual(mockGames);
      expect(mockPrismaService.game.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            genre: 'Action',
            title: { contains: 'Action', mode: 'insensitive' },
            platforms: { hasSome: ['PC'] },
            price: expect.objectContaining({
              gte: expect.anything(),
              lte: expect.anything(),
            }),
          }),
          orderBy: { price: 'asc' },
        }),
      );
    });

    it('should calculate totalPages correctly', async () => {
      const mockGames = Array(10).fill({ id: 1, title: 'Game' });

      mockPrismaService.game.findMany.mockResolvedValue(mockGames);
      mockPrismaService.game.count.mockResolvedValue(25);

      const query = { page: 1, limit: 10 };
      const result = await service.getAllGames(query);

      expect(result.meta.totalPages).toBe(3);
    });

    it('should skip correct number of items for pagination', async () => {
      mockPrismaService.game.findMany.mockResolvedValue([]);
      mockPrismaService.game.count.mockResolvedValue(0);

      const query = { page: 3, limit: 10 };
      await service.getAllGames(query);

      expect(mockPrismaService.game.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 20,
          take: 10,
        }),
      );
    });
  });

  describe('getGame', () => {
    it('should return a game by id without keys', async () => {
      const mockGame = {
        id: 1,
        title: 'Test Game',
        description: 'Description',
        price: '59.99',
        quantity: 5,
      };

      mockPrismaService.game.findUniqueOrThrow.mockResolvedValue(mockGame);

      const result = await service.getGame(1);

      expect(result).toEqual(mockGame);
      expect(mockPrismaService.game.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { id: 1 },
        omit: { keys: true },
      });
    });

    it('should throw when game not found', async () => {
      mockPrismaService.game.findUniqueOrThrow.mockRejectedValue(
        new Error('Record not found'),
      );

      await expect(service.getGame(999)).rejects.toThrow();
    });
  });

  describe('updateGame', () => {
    it('should update a game successfully', async () => {
      const updateData = { title: 'Updated Game Title' };
      const updatedGame = {
        id: 1,
        title: 'Updated Game Title',
        price: '59.99',
        quantity: 5,
      };

      mockPrismaService.game.update.mockResolvedValue(updatedGame);

      const result = await service.updateGame(1, updateData);

      expect(result.title).toBe('Updated Game Title');
      expect(mockPrismaService.game.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateData,
      });
    });

    it('should update game price', async () => {
      const updateData = { price: '39.99' };
      const updatedGame = {
        id: 1,
        title: 'Test Game',
        price: '39.99',
        quantity: 5,
      };

      mockPrismaService.game.update.mockResolvedValue(updatedGame);

      const result = await service.updateGame(1, updateData);

      expect(result.price).toBe('39.99');
    });

    it('should update game keys', async () => {
      const updateData = { keys: ['NEW-KEY-001', 'NEW-KEY-002'], quantity: 2 };
      const updatedGame = {
        id: 1,
        title: 'Test Game',
        keys: ['NEW-KEY-001', 'NEW-KEY-002'],
        quantity: 2,
      };

      mockPrismaService.game.update.mockResolvedValue(updatedGame);

      const result = await service.updateGame(1, updateData);

      expect(result.keys).toEqual(['NEW-KEY-001', 'NEW-KEY-002']);
    });

    it('should throw when updating non-existent game', async () => {
      mockPrismaService.game.update.mockRejectedValue(
        new Error('Record not found'),
      );

      await expect(
        service.updateGame(999, { title: 'Test' }),
      ).rejects.toThrow();
    });
  });

  describe('deleteGame', () => {
    it('should delete a game successfully', async () => {
      mockPrismaService.game.delete.mockResolvedValue({});

      await service.deleteGame(1);

      expect(mockPrismaService.game.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw when deleting non-existent game', async () => {
      mockPrismaService.game.delete.mockRejectedValue(
        new Error('Record not found'),
      );

      await expect(service.deleteGame(999)).rejects.toThrow();
    });
  });

  describe('CreateGameDto Validation', () => {
    it('should fail when required field title is missing', async () => {
      const dto = plainToInstance(CreateGameDto, {
        genre: 'Action',
        description: 'Test description',
        trailer: 'https://example.com/trailer',
        price: '59.99',
        developer: 'Test Developer',
        publisher: 'Test Publisher',
        releaseDate: '2025-01-01',
        platforms: ['PC'],
        keys: ['KEY-001'],
        quantity: 1,
        buyCount: 0,
        minOS: 'Windows 10',
        minCPU: 'Intel i5',
        minMemory: '8GB',
        minGPU: 'GTX 1060',
        minStorage: '50GB',
        recOS: 'Windows 11',
        recCPU: 'Intel i7',
        recMemory: '16GB',
        recGPU: 'RTX 3060',
        recStorage: '100GB',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail when genre is empty', async () => {
      const dto = plainToInstance(CreateGameDto, {
        title: 'Test Game',
        genre: '',
        description: 'Test description',
        trailer: 'https://example.com/trailer',
        price: '59.99',
        developer: 'Test Developer',
        publisher: 'Test Publisher',
        releaseDate: '2025-01-01',
        platforms: ['PC'],
        keys: ['KEY-001'],
        quantity: 1,
        buyCount: 0,
        minOS: 'Windows 10',
        minCPU: 'Intel i5',
        minMemory: '8GB',
        minGPU: 'GTX 1060',
        minStorage: '50GB',
        recOS: 'Windows 11',
        recCPU: 'Intel i7',
        recMemory: '16GB',
        recGPU: 'RTX 3060',
        recStorage: '100GB',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.property === 'genre')).toBe(true);
    });

    it('should fail when platforms is not an array of strings', async () => {
      const dto = plainToInstance(CreateGameDto, {
        title: 'Test Game',
        genre: 'Action',
        description: 'Test description',
        trailer: 'https://example.com/trailer',
        price: '59.99',
        developer: 'Test Developer',
        publisher: 'Test Publisher',
        releaseDate: '2025-01-01',
        platforms: [123, 456],
        keys: ['KEY-001'],
        quantity: 1,
        buyCount: 0,
        minOS: 'Windows 10',
        minCPU: 'Intel i5',
        minMemory: '8GB',
        minGPU: 'GTX 1060',
        minStorage: '50GB',
        recOS: 'Windows 11',
        recCPU: 'Intel i7',
        recMemory: '16GB',
        recGPU: 'RTX 3060',
        recStorage: '100GB',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.property === 'platforms')).toBe(true);
    });

    it('should fail when buyCount is not an integer', async () => {
      const dto = plainToInstance(CreateGameDto, {
        title: 'Test Game',
        genre: 'Action',
        description: 'Test description',
        trailer: 'https://example.com/trailer',
        price: '59.99',
        developer: 'Test Developer',
        publisher: 'Test Publisher',
        releaseDate: '2025-01-01',
        platforms: ['PC'],
        keys: ['KEY-001'],
        quantity: 1,
        buyCount: 'not-an-int',
        minOS: 'Windows 10',
        minCPU: 'Intel i5',
        minMemory: '8GB',
        minGPU: 'GTX 1060',
        minStorage: '50GB',
        recOS: 'Windows 11',
        recCPU: 'Intel i7',
        recMemory: '16GB',
        recGPU: 'RTX 3060',
        recStorage: '100GB',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.property === 'buyCount')).toBe(true);
    });
  });

  describe('UpdateGameDto Validation', () => {
    it('should pass with partial update data', async () => {
      const dto = plainToInstance(UpdateGameDto, {
        title: 'Updated Title',
      });

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should pass with empty update (all fields optional)', async () => {
      const dto = plainToInstance(UpdateGameDto, {});

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should fail when price is invalid in update', async () => {
      const dto = plainToInstance(UpdateGameDto, {
        price: 'invalid-price',
      });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.property === 'price')).toBe(true);
    });
  });
});
