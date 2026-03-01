import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser({ email, name, password, role }: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(password, 10);

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
    return newUser;
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true },
    });
    return users;
  }

  async getUser(userId: number) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true },
    });
    return user;
  }

  async updateUser(userId: number, modifedUserData: UpdateUserDto) {
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
    return updatedUser;
  }

  async deleteUser(userId: number) {
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
