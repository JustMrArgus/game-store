import {
  IsArray,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateGameDto {
  @IsArray()
  @IsString({ each: true })
  keys: string[];

  @IsNumber()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  trailer: string;

  @IsString()
  @IsNotEmpty()
  primaryImage: string;

  @IsArray()
  @IsString({ each: true })
  additionalImages: string[];

  @IsString()
  @IsNotEmpty()
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
