import { IsArray, IsNumber, IsString } from 'class-validator';

export class UpdateGameDto {
  @IsString()
  key?: string;

  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsString()
  trailer?: string;

  @IsString()
  primaryImage?: string;

  @IsArray()
  @IsString({ each: true })
  additionalImages?: string[];

  @IsString()
  logo?: string;

  @IsNumber()
  price?: number;

  @IsString()
  developer?: string;

  @IsString()
  publisher?: string;

  @IsString()
  releaseDate?: string;

  @IsArray()
  @IsString({ each: true })
  platforms?: string[];

  @IsString()
  minOS?: string;

  @IsString()
  minCPU?: string;

  @IsString()
  minMemory?: string;

  @IsString()
  minGPU?: string;

  @IsString()
  minStorage?: string;

  @IsString()
  recOS?: string;

  @IsString()
  recCPU?: string;

  @IsString()
  recMemory?: string;

  @IsString()
  recGPU?: string;

  @IsString()
  recStorage?: string;
}
