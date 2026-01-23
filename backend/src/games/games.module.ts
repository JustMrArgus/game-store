import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from 'src/files/multer.config';

@Module({
  imports: [PrismaModule, MulterModule.register(multerOptions)],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
