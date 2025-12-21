import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

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

  @Patch(':gameId')
  async updateGame(
    @Param('gameId', ParseIntPipe) gameId: number,
    @Body() modifiedGameData: UpdateGameDto,
  ) {
    return await this.gamesService.updateGame(gameId, modifiedGameData);
  }

  @Delete(':gameId')
  async deleteGame(@Param('gameId', ParseIntPipe) gameId: number) {
    return await this.gamesService.deleteGame(gameId);
  }
}
