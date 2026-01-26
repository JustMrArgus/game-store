import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { AuthGuard } from '@nestjs/passport';
import { ROLE } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { GetGamesQueryDto } from './dto/get-games.query.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Roles(ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt-at'), RolesGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'primaryImage', maxCount: 1 },
      { name: 'logo', maxCount: 1 },
      { name: 'additionalImages', maxCount: 10 },
    ]),
  )
  async createGame(
    @UploadedFiles()
    files: {
      primaryImage?: Express.Multer.File[];
      logo?: Express.Multer.File[];
      additionalImages?: Express.Multer.File[];
    },
    @Body() newGameDto: CreateGameDto,
  ) {
    const primaryImagePath = files.primaryImage
      ? `/uploads/${files.primaryImage[0].filename}`
      : '';
    const logoPath = files.logo ? `/uploads/${files.logo[0].filename}` : '';
    const additionalImagesPaths = files.additionalImages
      ? files.additionalImages.map((file) => `/uploads/${file.filename}`)
      : [];

    const gameData = {
      ...newGameDto,
      primaryImage: primaryImagePath,
      logo: logoPath,
      additionalImages: additionalImagesPaths,
    };

    return await this.gamesService.createGame(gameData);
  }

  @Get()
  async getAllGames(@Query() query: GetGamesQueryDto) {
    return this.gamesService.getAllGames(query);
  }

  @Get(':gameId')
  async getGame(@Param('gameId', ParseIntPipe) gameId: number) {
    return await this.gamesService.getGame(gameId);
  }

  @Roles(ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt-at'), RolesGuard)
  @Patch(':gameId')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'primaryImage', maxCount: 1 },
      { name: 'logo', maxCount: 1 },
      { name: 'additionalImages', maxCount: 10 },
    ]),
  )
  async updateGame(
    @Param('gameId', ParseIntPipe) gameId: number,
    @Body() modifiedGameData: UpdateGameDto,
    @UploadedFiles()
    files: {
      primaryImage?: Express.Multer.File[];
      logo?: Express.Multer.File[];
      additionalImages?: Express.Multer.File[];
    },
  ) {
    const updateData: any = { ...modifiedGameData };

    if (files.primaryImage) {
      updateData.primaryImage = `/uploads/${files.primaryImage[0].filename}`;
    }
    if (files.logo) {
      updateData.logo = `/uploads/${files.logo[0].filename}`;
    }
    if (files.additionalImages) {
      updateData.additionalImages = files.additionalImages.map(
        (file) => `/uploads/${file.filename}`,
      );
    }

    return await this.gamesService.updateGame(gameId, updateData);
  }

  @Roles(ROLE.ADMIN)
  @UseGuards(AuthGuard('jwt-at'), RolesGuard)
  @Delete(':gameId')
  async deleteGame(@Param('gameId', ParseIntPipe) gameId: number) {
    return await this.gamesService.deleteGame(gameId);
  }
}
