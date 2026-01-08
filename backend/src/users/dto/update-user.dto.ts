import {
  IsEmail,
  IsString,
  IsStrongPassword,
  IsOptional,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { ROLE } from '@prisma/client';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsStrongPassword()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @IsEnum(ROLE as unknown as object)
  @IsOptional()
  role?: ROLE;
}
