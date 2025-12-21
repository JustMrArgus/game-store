import {
  IsEmail,
  IsString,
  IsStrongPassword,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsStrongPassword()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  name?: string;
}
