import { Test, TestingModule } from '@nestjs/testing';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

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
        status: 'success',
        data: [
          { id: 1, title: 'Game 1', price: '59.99' },
          { id: 2, title: 'Game 2', price: '49.99' },
        ],
      };
      mockGamesService.getAllGames.mockResolvedValue(mockGames);

      const result = await controller.getAllGames();

      expect(result).toEqual(mockGames);
      expect(mockGamesService.getAllGames).toHaveBeenCalled();
    });
  });

  describe('getGame', () => {
    it('should return a game by id', async () => {
      const mockGame = {
        status: 'success',
        data: { id: 1, title: 'Game 1', price: '59.99' },
      };
      mockGamesService.getGame.mockResolvedValue(mockGame);

      const result = await controller.getGame(1);

      expect(result).toEqual(mockGame);
      expect(mockGamesService.getGame).toHaveBeenCalledWith(1);
    });
  });

  describe('deleteGame', () => {
    it('should delete a game', async () => {
      mockGamesService.deleteGame.mockResolvedValue({ status: 'success' });

      const result = await controller.deleteGame(1);

      expect(result).toEqual({ status: 'success' });
      expect(mockGamesService.deleteGame).toHaveBeenCalledWith(1);
    });
  });
});
