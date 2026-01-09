import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { AuthGuard } from '@nestjs/passport';
import { ROLE } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Roles(ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt-at'), RolesGuard)
  @Post()
  async createGame(@Body() newGame: CreateGameDto) {
    return await this.gamesService.createGame(newGame);
  }

  @Get()
  async getAllGames() {
    return await this.gamesService.getAllGames();
  }

  @Get(':gameId')
  async getGame(@Param('gameId', ParseIntPipe) gameId: number) {
    return await this.gamesService.getGame(gameId);
  }

  @Roles(ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt-at'), RolesGuard)
  @Patch(':gameId')
  async updateGame(
    @Param('gameId', ParseIntPipe) gameId: number,
    @Body() modifiedGameData: UpdateGameDto,
  ) {
    return await this.gamesService.updateGame(gameId, modifiedGameData);
  }

  @Roles(ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt-at'), RolesGuard)
  @Delete(':gameId')
  async deleteGame(@Param('gameId', ParseIntPipe) gameId: number) {
    return await this.gamesService.deleteGame(gameId);
  }
}
