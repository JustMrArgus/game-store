import {
  IsArray,
  IsNumber,
  IsString,
  IsOptional,
  IsNotEmpty,
  IsDecimal,
} from 'class-validator';

export class UpdateGameDto {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  keys?: string[];

  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  trailer?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  primaryImage?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  additionalImages?: string[];

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  logo?: string;

  @IsDecimal()
  @IsOptional()
  price?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  developer?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  publisher?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  releaseDate?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  platforms?: string[];

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  minOS?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  minCPU?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  minMemory?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  minGPU?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  minStorage?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  recOS?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  recCPU?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  recMemory?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  recGPU?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  recStorage?: string;
}
