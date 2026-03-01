import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ROLE } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt-at'), RolesGuard)
  @Post()
  async createUser(@Body() newUser: CreateUserDto) {
    return await this.usersService.createUser(newUser);
  }

  @Roles(ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt-at'), RolesGuard)
  @Get()
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @Roles(ROLE.ADMIN, ROLE.USER)
  @UseGuards(AuthGuard('jwt-at'), RolesGuard)
  @Get('me')
  async getMe(@Req() req: any) {
    const userId = req.user.sub;

    return await this.usersService.getUser(+userId);
  }

  @Roles(ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt-at'), RolesGuard)
  @Get(':userId')
  async getUser(@Param('userId', ParseIntPipe) userId: number) {
    return await this.usersService.getUser(userId);
  }

  @Roles(ROLE.ADMIN, ROLE.USER)
  @UseGuards(AuthGuard('jwt-at'), RolesGuard)
  @Patch('me')
  async updateMe(@Req() req: any, @Body() modifedUserData: UpdateUserDto) {
    const userId = req.user.sub;

    return await this.usersService.updateUser(+userId, modifedUserData);
  }

  @Roles(ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt-at'), RolesGuard)
  @Patch(':userId')
  async updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() modifedUserData: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(userId, modifedUserData);
  }

  @Roles(ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt-at'), RolesGuard)
  @Delete(':userId')
  async deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return await this.usersService.deleteUser(userId);
  }
}
