import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

  async createGame(newGameData: CreateGameDto) {
    try {
      const newGame = await this.prisma.game.create({
        data: newGameData,
      });
      return { status: 'success', data: newGame };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getAllGames() {
    try {
      return await this.prisma.game.findMany({ omit: { key: true } });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getGame(gameId: number) {
    try {
      const game = await this.prisma.game.findUniqueOrThrow({
        where: { id: gameId },
        omit: { key: true },
      });
      return { status: 'success', data: game };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Game with id ${gameId} does not exists`);
      }
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async updateGame(gameId: number, modifiedGameData: UpdateGameDto) {
    try {
      const updatedGame = await this.prisma.game.update({
        where: { id: gameId },
        data: modifiedGameData,
      });
      return { status: 'success', data: updatedGame };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Game with id ${gameId} does not exists`);
      }
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async deleteGame(gameId: number) {
    try {
      await this.prisma.game.delete({
        where: { id: gameId },
      });
      return { status: 'success' };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Game with id ${gameId} does not exists`);
      }
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
