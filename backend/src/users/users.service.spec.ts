import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { ROLE } from '@prisma/client';

describe('UsersService', () => {
  let service: UsersService;

  const mockPrismaService = {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUniqueOrThrow: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user successfully', async () => {
      const createUserDto = {
        email: 'test@test.com',
        name: 'Test User',
        password: 'password123',
        role: ROLE.USER,
      };

      mockPrismaService.user.create.mockResolvedValue({
        id: 1,
        email: createUserDto.email,
        name: createUserDto.name,
      });

      const result = await service.createUser(createUserDto);

      expect(result.status).toBe('success');
      expect(result.data.email).toBe(createUserDto.email);
      expect(result.data.name).toBe(createUserDto.name);
      expect(mockPrismaService.user.create).toHaveBeenCalled();
    });

    it('should hash the password before saving', async () => {
      const createUserDto = {
        email: 'test@test.com',
        name: 'Test User',
        password: 'password123',
        role: ROLE.USER,
      };

      mockPrismaService.user.create.mockResolvedValue({
        id: 1,
        email: createUserDto.email,
        name: createUserDto.name,
      });

      await service.createUser(createUserDto);

      const createCall = mockPrismaService.user.create.mock.calls[0][0];
      expect(createCall.data.password).not.toBe('password123');
      expect(createCall.data.password.length).toBeGreaterThan(10);
    });

    it('should create a cart for the new user', async () => {
      const createUserDto = {
        email: 'test@test.com',
        name: 'Test User',
        password: 'password123',
        role: ROLE.USER,
      };

      mockPrismaService.user.create.mockResolvedValue({
        id: 1,
        email: createUserDto.email,
        name: createUserDto.name,
      });

      await service.createUser(createUserDto);

      const createCall = mockPrismaService.user.create.mock.calls[0][0];
      expect(createCall.data.cart).toEqual({ create: {} });
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const mockUsers = [
        { id: 1, email: 'user1@test.com', name: 'User 1', role: ROLE.USER },
        { id: 2, email: 'user2@test.com', name: 'User 2', role: ROLE.ADMIN },
      ];

      mockPrismaService.user.findMany.mockResolvedValue(mockUsers);

      const result = await service.getAllUsers();

      expect(result.status).toBe('success');
      expect(result.data).toEqual(mockUsers);
      expect(result.data.length).toBe(2);
    });

    it('should return empty array when no users exist', async () => {
      mockPrismaService.user.findMany.mockResolvedValue([]);

      const result = await service.getAllUsers();

      expect(result.status).toBe('success');
      expect(result.data).toEqual([]);
    });
  });

  describe('getUser', () => {
    it('should return a user by id', async () => {
      const mockUser = {
        id: 1,
        email: 'test@test.com',
        name: 'Test User',
        role: ROLE.USER,
      };

      mockPrismaService.user.findUniqueOrThrow.mockResolvedValue(mockUser);

      const result = await service.getUser(1);

      expect(result.status).toBe('success');
      expect(result.data).toEqual(mockUser);
      expect(mockPrismaService.user.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { id: 1 },
        select: { id: true, email: true, name: true, role: true },
      });
    });

    it('should throw when user not found', async () => {
      mockPrismaService.user.findUniqueOrThrow.mockRejectedValue(
        new Error('Record not found'),
      );

      await expect(service.getUser(999)).rejects.toThrow();
    });
  });

  describe('updateUser', () => {
    it('should update a user successfully', async () => {
      const updateData = { name: 'Updated Name' };
      const updatedUser = {
        id: 1,
        email: 'test@test.com',
        name: 'Updated Name',
        role: ROLE.USER,
      };

      mockPrismaService.user.update.mockResolvedValue(updatedUser);

      const result = await service.updateUser(1, updateData);

      expect(result.status).toBe('success');
      expect(result.data.name).toBe('Updated Name');
      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateData,
        select: { id: true, email: true, name: true, role: true },
      });
    });

    it('should update user email', async () => {
      const updateData = { email: 'newemail@test.com' };
      const updatedUser = {
        id: 1,
        email: 'newemail@test.com',
        name: 'Test User',
        role: ROLE.USER,
      };

      mockPrismaService.user.update.mockResolvedValue(updatedUser);

      const result = await service.updateUser(1, updateData);

      expect(result.status).toBe('success');
      expect(result.data.email).toBe('newemail@test.com');
    });

    it('should throw when updating non-existent user', async () => {
      mockPrismaService.user.update.mockRejectedValue(
        new Error('Record not found'),
      );

      await expect(service.updateUser(999, { name: 'Test' })).rejects.toThrow();
    });
  });

  describe('deleteUser', () => {
    it('should delete a user successfully', async () => {
      mockPrismaService.user.delete.mockResolvedValue({});

      const result = await service.deleteUser(1);

      expect(result.status).toBe('success');
      expect(mockPrismaService.user.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw when deleting non-existent user', async () => {
      mockPrismaService.user.delete.mockRejectedValue(
        new Error('Record not found'),
      );

      await expect(service.deleteUser(999)).rejects.toThrow();
    });
  });
});
