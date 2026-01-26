import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ForbiddenException } from '@nestjs/common';
import { ROLE } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;
  let configService: ConfigService;

  const mockPrismaService = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  const mockConfigService = {
    getOrThrow: jest.fn((key: string) => {
      const config: Record<string, string | number> = {
        ACCESS_TOKEN_SECRET: 'test-access-secret',
        REFRESH_TOKEN_SECRET: 'test-refresh-secret',
        MAX_REFRESH_TOKENS: 5,
      };
      return config[key];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateTokens', () => {
    it('should generate access and refresh tokens', async () => {
      mockJwtService.signAsync
        .mockResolvedValueOnce('access-token')
        .mockResolvedValueOnce('refresh-token');

      const result = await service.generateTokens(
        1,
        'test@test.com',
        ROLE.USER,
      );

      expect(result).toEqual({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      });
      expect(mockJwtService.signAsync).toHaveBeenCalledTimes(2);
    });
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const registerDto = {
        email: 'test@test.com',
        name: 'Test User',
        password: 'password123',
      };

      mockPrismaService.user.create.mockResolvedValue({
        id: 1,
        email: registerDto.email,
        name: registerDto.name,
      });

      mockPrismaService.user.findUnique.mockResolvedValue({
        hashedRefreshTokens: [],
      });

      mockPrismaService.user.update.mockResolvedValue({});

      mockJwtService.signAsync
        .mockResolvedValueOnce('access-token')
        .mockResolvedValueOnce('refresh-token');

      const result = await service.register(registerDto);

      expect(result.email).toBe(registerDto.email);
      expect(result.name).toBe(registerDto.name);
      expect(result.accessToken).toBe('access-token');
      expect(result.refreshToken).toBe('refresh-token');
      expect(mockPrismaService.user.create).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should return user data on successful login', async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const mockUser = {
        id: 1,
        email: 'test@test.com',
        name: 'Test User',
        password: hashedPassword,
        role: ROLE.USER,
      };

      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.login('test@test.com', 'password123');

      expect(result).toBeDefined();
      expect(result.email).toBe('test@test.com');
      expect(result.password).toBeUndefined();
    });

    it('should return null for invalid credentials', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      const result = await service.login('test@test.com', 'wrongpassword');

      expect(result).toBeNull();
    });

    it('should return null for wrong password', async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const mockUser = {
        id: 1,
        email: 'test@test.com',
        password: hashedPassword,
      };

      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.login('test@test.com', 'wrongpassword');

      expect(result).toBeNull();
    });
  });

  describe('logout', () => {
    it('should logout user by clearing refresh token', async () => {
      const hashedToken = await bcrypt.hash('refresh-token', 10);
      mockPrismaService.user.findUnique.mockResolvedValue({
        hashedRefreshTokens: [hashedToken],
      });
      mockPrismaService.user.update.mockResolvedValue({});

      await service.logout(1, 'refresh-token');

      expect(mockPrismaService.user.update).toHaveBeenCalled();
    });

    it('should return without error when user has no tokens', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue({
        hashedRefreshTokens: [],
      });

      await expect(service.logout(1)).resolves.toBeUndefined();
    });

    it('should clear all tokens when no currentRefreshToken provided', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue({
        hashedRefreshTokens: ['hash1', 'hash2'],
      });
      mockPrismaService.user.update.mockResolvedValue({});

      await service.logout(1);

      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { hashedRefreshTokens: [] },
      });
    });
  });

  describe('refreshTokens', () => {
    it('should throw ForbiddenException when user not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.refreshTokens(1, 'refresh-token')).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should throw ForbiddenException when no tokens stored', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue({
        id: 1,
        hashedRefreshTokens: [],
      });

      await expect(service.refreshTokens(1, 'refresh-token')).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should refresh tokens successfully', async () => {
      const hashedToken = await bcrypt.hash('valid-refresh-token', 10);
      mockPrismaService.user.findUnique.mockResolvedValue({
        id: 1,
        email: 'test@test.com',
        role: ROLE.USER,
        hashedRefreshTokens: [hashedToken],
      });

      mockJwtService.signAsync
        .mockResolvedValueOnce('new-access-token')
        .mockResolvedValueOnce('new-refresh-token');

      mockPrismaService.user.update.mockResolvedValue({});

      const result = await service.refreshTokens(1, 'valid-refresh-token');

      expect(result.accessToken).toBe('new-access-token');
      expect(result.refreshToken).toBe('new-refresh-token');
    });

    it('should clear all tokens on invalid refresh token (token reuse)', async () => {
      const hashedToken = await bcrypt.hash('other-token', 10);
      mockPrismaService.user.findUnique.mockResolvedValue({
        id: 1,
        hashedRefreshTokens: [hashedToken],
      });

      mockPrismaService.user.update.mockResolvedValue({});

      await expect(
        service.refreshTokens(1, 'invalid-refresh-token'),
      ).rejects.toThrow(ForbiddenException);

      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { hashedRefreshTokens: [] },
      });
    });
  });

  describe('addRefreshTokenHash', () => {
    it('should add refresh token hash to user', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue({
        hashedRefreshTokens: [],
      });
      mockPrismaService.user.update.mockResolvedValue({});

      await service.addRefreshTokenHash(1, 'refresh-token');

      expect(mockPrismaService.user.update).toHaveBeenCalled();
    });

    it('should limit tokens to MAX_REFRESH_TOKENS', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue({
        hashedRefreshTokens: ['hash1', 'hash2', 'hash3', 'hash4', 'hash5'],
      });
      mockPrismaService.user.update.mockResolvedValue({});

      await service.addRefreshTokenHash(1, 'new-refresh-token');

      expect(mockPrismaService.user.update).toHaveBeenCalled();
      const updateCall = mockPrismaService.user.update.mock.calls[0][0];
      expect(updateCall.data.hashedRefreshTokens.length).toBeLessThanOrEqual(5);
    });
  });

  describe('clearAllRefreshTokens', () => {
    it('should clear all refresh tokens for user', async () => {
      mockPrismaService.user.update.mockResolvedValue({});

      await service.clearAllRefreshTokens(1);

      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { hashedRefreshTokens: [] },
      });
    });
  });
});
