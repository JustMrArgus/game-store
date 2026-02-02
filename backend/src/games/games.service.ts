import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GetGamesQueryDto } from './dto/get-games.query.dto';
import { Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/client';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

  async createGame(newGameData: CreateGameDto) {
    const newGame = await this.prisma.game.create({
      data: newGameData,
    });
    return newGame;
  }

  async getAllGames(query: GetGamesQueryDto) {
    const {
      page,
      limit,
      genre,
      search,
      platforms,
      minPrice,
      maxPrice,
      sortBy,
      sortOrder,
    } = query;

    const skip = (page - 1) * limit;

    const where: Prisma.GameWhereInput = {};
    let orderBy: Prisma.GameOrderByWithRelationInput | undefined;

    if (genre) {
      where.genre = genre;
    }

    if (search) {
      where.title = {
        contains: search,
        mode: 'insensitive',
      };
    }

    if (platforms?.length) {
      where.platforms = {
        hasSome: platforms,
      };
    }

    if (minPrice || maxPrice) {
      where.price = {};

      if (minPrice) {
        where.price.gte = new Decimal(minPrice);
      }

      if (maxPrice) {
        where.price.lte = new Decimal(maxPrice);
      }
    }

    if (sortBy) {
      orderBy = { [sortBy]: sortOrder };
    }

    const [items, total] = await Promise.all([
      this.prisma.game.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        omit: { keys: true },
      }),
      this.prisma.game.count({ where }),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
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
