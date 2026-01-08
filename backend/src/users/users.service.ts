import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser({ email, name, password, role }: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = await this.prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          role,
          cart: {
            create: {},
          },
        },
        select: {
          id: true,
          email: true,
          name: true,
        },
      });
      return { status: 'success', data: newUser };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('User with this email is already exists');
      }
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getAllUsers() {
    try {
      const users = await this.prisma.user.findMany({
        select: { id: true, email: true, name: true, role: true },
      });
      return { status: 'success', data: users };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getUser(userId: number) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id: userId },
        select: { id: true, email: true, name: true, role: true },
      });
      return { status: 'success', data: user };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with id ${userId} does not exists`);
      }
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async updateUser(userId: number, modifedUserData: UpdateUserDto) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: modifedUserData,
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      });
      return { status: 'success', data: updatedUser };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with id ${userId} does not exists`);
      }
      if (error.code === 'P2002') {
        throw new ConflictException('User with this email already exists');
      }
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async deleteUser(userId: number) {
    try {
      await this.prisma.user.delete({
        where: { id: userId },
      });

      return { status: 'success' };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with id ${userId} does not exists`);
      }
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
