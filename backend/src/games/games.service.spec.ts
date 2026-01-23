import { Test, TestingModule } from '@nestjs/testing';
import { GamesService } from './games.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';

describe('GamesService', () => {
  let service: GamesService;

  const mockPrismaService = {
    game: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUniqueOrThrow: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
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

      expect(result.status).toBe('success');
      expect(result.data).toEqual(mockCreatedGame);
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

      expect(result.status).toBe('success');
      expect(result.data.title).toBe('Test Game');
      expect(result.data.price).toBe('59.99');
    });
  });

  describe('getAllGames', () => {
    it('should return all games without keys', async () => {
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

      const result = await service.getAllGames();

      expect(result.status).toBe('success');
      expect(result.data).toEqual(mockGames);
      expect(result.data.length).toBe(2);
      expect(mockPrismaService.game.findMany).toHaveBeenCalledWith({
        omit: { keys: true },
      });
    });

    it('should return empty array when no games exist', async () => {
      mockPrismaService.game.findMany.mockResolvedValue([]);

      const result = await service.getAllGames();

      expect(result.status).toBe('success');
      expect(result.data).toEqual([]);
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

      expect(result.status).toBe('success');
      expect(result.data).toEqual(mockGame);
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

      expect(result.status).toBe('success');
      expect(result.data.title).toBe('Updated Game Title');
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

      expect(result.status).toBe('success');
      expect(result.data.price).toBe('39.99');
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

      expect(result.status).toBe('success');
      expect(result.data.keys).toEqual(['NEW-KEY-001', 'NEW-KEY-002']);
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

      const result = await service.deleteGame(1);

      expect(result.status).toBe('success');
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
});
