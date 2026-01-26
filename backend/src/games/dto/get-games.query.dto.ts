import {
  IsArray,
  IsDecimal,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Decimal } from '@prisma/client/runtime/client';

export class GetGamesQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 10;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsDecimal({ decimal_digits: '0,2' })
  minPrice?: string;

  @IsOptional()
  @IsDecimal({ decimal_digits: '0,2' })
  maxPrice?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) =>
    typeof value === 'string'
      ? value.split(',').map((v: string) => v.trim())
      : value,
  )
  platforms?: string[];

  @IsOptional()
  @IsString()
  search?: string;
}
