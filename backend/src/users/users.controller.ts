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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createUser(@Body() newUser: CreateUserDto) {
    return await this.usersService.createUser(newUser);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':userId')
  async getUser(@Param('userId', ParseIntPipe) userId: number) {
    return await this.usersService.getUser(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMe(@Req() req: any) {
    const userId = req.user.sub;

    return await this.usersService.getUser(+userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':userId')
  async updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() modifedUserData: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(userId, modifedUserData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':userId')
  async deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return await this.usersService.deleteUser(userId);
  }
}
