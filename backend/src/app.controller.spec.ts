import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  const mockAppService = {
    getHealth: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: AppService, useValue: mockAppService }],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('getHealth', () => {
    it('should return health status', () => {
      const mockHealthResponse = {
        status: 'success',
        currentDate: '2026-01-23T00:00:00.000Z',
      };
      mockAppService.getHealth.mockReturnValue(mockHealthResponse);

      const result = appController.getHealth();

      expect(result).toEqual(mockHealthResponse);
      expect(mockAppService.getHealth).toHaveBeenCalled();
    });
  });
});
