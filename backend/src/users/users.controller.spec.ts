import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ROLE } from '@prisma/client';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    createUser: jest.fn(),
    getAllUsers: jest.fn(),
    getUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto = {
        email: 'test@test.com',
        name: 'Test User',
        password: 'password123',
        role: ROLE.USER,
      };
      const mockUser = {
        status: 'success',
        data: { id: 1, email: 'test@test.com', name: 'Test User' },
      };
      mockUsersService.createUser.mockResolvedValue(mockUser);

      const result = await controller.createUser(createUserDto);

      expect(result).toEqual(mockUser);
      expect(mockUsersService.createUser).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const mockUsers = {
        status: 'success',
        data: [
          { id: 1, email: 'user1@test.com', name: 'User 1', role: ROLE.USER },
          { id: 2, email: 'user2@test.com', name: 'User 2', role: ROLE.ADMIN },
        ],
      };
      mockUsersService.getAllUsers.mockResolvedValue(mockUsers);

      const result = await controller.getAllUsers();

      expect(result).toEqual(mockUsers);
      expect(mockUsersService.getAllUsers).toHaveBeenCalled();
    });
  });

  describe('getUser', () => {
    it('should return a user by id', async () => {
      const mockUser = {
        status: 'success',
        data: {
          id: 1,
          email: 'test@test.com',
          name: 'Test User',
          role: ROLE.USER,
        },
      };
      mockUsersService.getUser.mockResolvedValue(mockUser);

      const result = await controller.getUser(1);

      expect(result).toEqual(mockUser);
      expect(mockUsersService.getUser).toHaveBeenCalledWith(1);
    });
  });

  describe('getMe', () => {
    it('should return current user', async () => {
      const mockRequest = { user: { sub: 1 } };
      const mockUser = {
        status: 'success',
        data: {
          id: 1,
          email: 'test@test.com',
          name: 'Test User',
          role: ROLE.USER,
        },
      };
      mockUsersService.getUser.mockResolvedValue(mockUser);

      const result = await controller.getMe(mockRequest);

      expect(result).toEqual(mockUser);
      expect(mockUsersService.getUser).toHaveBeenCalledWith(1);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const updateUserDto = { name: 'Updated Name' };
      const mockUser = {
        status: 'success',
        data: {
          id: 1,
          email: 'test@test.com',
          name: 'Updated Name',
          role: ROLE.USER,
        },
      };
      mockUsersService.updateUser.mockResolvedValue(mockUser);

      const result = await controller.updateUser(1, updateUserDto);

      expect(result).toEqual(mockUser);
      expect(mockUsersService.updateUser).toHaveBeenCalledWith(
        1,
        updateUserDto,
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      mockUsersService.deleteUser.mockResolvedValue({ status: 'success' });

      const result = await controller.deleteUser(1);

      expect(result).toEqual({ status: 'success' });
      expect(mockUsersService.deleteUser).toHaveBeenCalledWith(1);
    });
  });
});
