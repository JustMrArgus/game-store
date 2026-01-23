import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
    generateTokens: jest.fn(),
    addRefreshTokenHash: jest.fn(),
    refreshTokens: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const registerDto = {
        email: 'test@test.com',
        name: 'Test User',
        password: 'password123',
      };

      const mockResponse = {
        cookie: jest.fn(),
        clearCookie: jest.fn(),
      } as any;

      mockAuthService.register.mockResolvedValue({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      });

      const result = await controller.register(registerDto, mockResponse);

      expect(result).toEqual({ status: 'success' });
      expect(mockAuthService.register).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('login', () => {
    it('should login user', async () => {
      const mockRequest = {
        user: {
          id: 1,
          email: 'test@test.com',
          role: 'USER',
        },
      };

      const mockResponse = {
        cookie: jest.fn(),
        clearCookie: jest.fn(),
      } as any;

      mockAuthService.generateTokens.mockResolvedValue({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      });
      mockAuthService.addRefreshTokenHash.mockResolvedValue(undefined);

      const result = await controller.login(mockRequest, mockResponse);

      expect(result).toEqual({ status: 'success' });
      expect(mockAuthService.generateTokens).toHaveBeenCalled();
      expect(mockAuthService.addRefreshTokenHash).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('should logout user', async () => {
      const mockRequest = {
        user: { sub: 1 },
        cookies: { refreshToken: 'refresh-token' },
      };

      const mockResponse = {
        cookie: jest.fn(),
        clearCookie: jest.fn(),
      } as any;

      mockAuthService.logout.mockResolvedValue({ status: 'success' });

      const result = await controller.logout(mockRequest, mockResponse);

      expect(result).toEqual({ status: 'success' });
      expect(mockAuthService.logout).toHaveBeenCalledWith(1, 'refresh-token');
      expect(mockResponse.clearCookie).toHaveBeenCalledWith('accessToken');
      expect(mockResponse.clearCookie).toHaveBeenCalledWith('refreshToken');
    });
  });
});
