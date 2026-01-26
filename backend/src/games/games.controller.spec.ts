import { Test, TestingModule } from '@nestjs/testing';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateGameDto } from './dto/create-game.dto';
import { GetGamesQueryDto } from './dto/get-games.query.dto';

describe('GamesController', () => {
  let controller: GamesController;

  const mockGamesService = {
    createGame: jest.fn(),
    getAllGames: jest.fn(),
    getGame: jest.fn(),
    updateGame: jest.fn(),
    deleteGame: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamesController],
      providers: [{ provide: GamesService, useValue: mockGamesService }],
    }).compile();

    controller = module.get<GamesController>(GamesController);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllGames', () => {
    it('should return all games', async () => {
      const mockGames = {
        items: [
          { id: 1, title: 'Game 1', price: '59.99' },
          { id: 2, title: 'Game 2', price: '49.99' },
        ],
        meta: { total: 2, page: 1, limit: 10, totalPages: 1 },
      };
      mockGamesService.getAllGames.mockResolvedValue(mockGames);

      const query = { page: 1, limit: 10 };
      const result = await controller.getAllGames(query);

      expect(result).toEqual(mockGames);
      expect(mockGamesService.getAllGames).toHaveBeenCalledWith(query);
    });
  });

  describe('getGame', () => {
    it('should return a game by id', async () => {
      const mockGame = { id: 1, title: 'Game 1', price: '59.99' };
      mockGamesService.getGame.mockResolvedValue(mockGame);

      const result = await controller.getGame(1);

      expect(result).toEqual(mockGame);
      expect(mockGamesService.getGame).toHaveBeenCalledWith(1);
    });
  });

  describe('deleteGame', () => {
    it('should delete a game', async () => {
      mockGamesService.deleteGame.mockResolvedValue(undefined);

      await controller.deleteGame(1);

      expect(mockGamesService.deleteGame).toHaveBeenCalledWith(1);
    });
  });

  describe('CreateGameDto Validation', () => {
    it('should fail validation when title is empty', async () => {
      const dto = plainToInstance(CreateGameDto, {
        title: '',
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
      expect(errors.some((e) => e.property === 'title')).toBe(true);
    });

    it('should fail validation when price is not a decimal', async () => {
      const dto = plainToInstance(CreateGameDto, {
        title: 'Test Game',
        genre: 'Action',
        description: 'Test description',
        trailer: 'https://example.com/trailer',
        price: 'not-a-price',
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
      expect(errors.some((e) => e.property === 'price')).toBe(true);
    });

    it('should pass validation with all required fields', async () => {
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
      expect(errors.length).toBe(0);
    });

    it('should fail validation when keys is not an array', async () => {
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
        keys: 123,
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
      expect(errors.some((e) => e.property === 'keys')).toBe(true);
    });

    it('should fail validation when quantity is not a number', async () => {
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
        quantity: 'not-a-number',
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
      expect(errors.some((e) => e.property === 'quantity')).toBe(true);
    });
  });

  describe('GetGamesQueryDto Validation', () => {
    it('should use default values for page and limit', async () => {
      const dto = plainToInstance(GetGamesQueryDto, {});

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
      expect(dto.page).toBe(1);
      expect(dto.limit).toBe(10);
    });

    it('should fail validation when page is less than 1', async () => {
      const dto = plainToInstance(GetGamesQueryDto, { page: 0 });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.property === 'page')).toBe(true);
    });

    it('should fail validation when limit is less than 1', async () => {
      const dto = plainToInstance(GetGamesQueryDto, { limit: 0 });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.property === 'limit')).toBe(true);
    });

    it('should accept valid page and limit values', async () => {
      const dto = plainToInstance(GetGamesQueryDto, { page: 2, limit: 20 });

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
      expect(dto.page).toBe(2);
      expect(dto.limit).toBe(20);
    });

    it('should fail validation when minPrice is not a decimal', async () => {
      const dto = plainToInstance(GetGamesQueryDto, { minPrice: 'invalid' });

      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.property === 'minPrice')).toBe(true);
    });

    it('should accept valid price filters', async () => {
      const dto = plainToInstance(GetGamesQueryDto, {
        minPrice: '10.00',
        maxPrice: '100.00',
      });

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should transform platforms string to array', async () => {
      const dto = plainToInstance(GetGamesQueryDto, {
        platforms: 'PC,PS5,Xbox',
      });

      const errors = await validate(dto);
      expect(errors.length).toBe(0);
      expect(dto.platforms).toEqual(['PC', 'PS5', 'Xbox']);
    });
  });
});
