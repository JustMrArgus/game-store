import {
  IsArray,
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateGameDto {
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  keys: string[];

  @IsNumber()
  @Type(() => Number)
  quantity: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsInt()
  @IsNotEmpty()
  buyCount: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  trailer: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  primaryImage: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  additionalImages: string[];

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  logo: string;

  @IsDecimal()
  price: string;

  @IsString()
  @IsNotEmpty()
  developer: string;

  @IsString()
  @IsNotEmpty()
  publisher: string;

  @IsString()
  @IsNotEmpty()
  releaseDate: string;

  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  platforms: string[];

  @IsString()
  @IsNotEmpty()
  minOS: string;

  @IsString()
  @IsNotEmpty()
  minCPU: string;

  @IsString()
  @IsNotEmpty()
  minMemory: string;

  @IsString()
  @IsNotEmpty()
  minGPU: string;

  @IsString()
  @IsNotEmpty()
  minStorage: string;

  @IsString()
  @IsNotEmpty()
  recOS: string;

  @IsString()
  @IsNotEmpty()
  recCPU: string;

  @IsString()
  @IsNotEmpty()
  recMemory: string;

  @IsString()
  @IsNotEmpty()
  recGPU: string;

  @IsString()
  @IsNotEmpty()
  recStorage: string;
}
