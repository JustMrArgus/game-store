import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

  async createGame(newGameData: CreateGameDto) {
    const newGame = await this.prisma.game.create({
      data: newGameData,
    });
    return newGame;
  }

  async getAllGames() {
    const games = await this.prisma.game.findMany({ omit: { keys: true } });
    return games;
  }

  async getGame(gameId: number) {
    const game = await this.prisma.game.findUniqueOrThrow({
      where: { id: gameId },
      omit: { keys: true },
    });
    return game;
  }

  async updateGame(gameId: number, modifiedGameData: UpdateGameDto) {
    const updatedGame = await this.prisma.game.update({
      where: { id: gameId },
      data: modifiedGameData,
    });
    return updatedGame;
  }

  async deleteGame(gameId: number) {
    await this.prisma.game.delete({
      where: { id: gameId },
    });
  }
}
