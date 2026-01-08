import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import type { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { ROLE } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.register(registerUserDto);

    this.setCookies(res, tokens.accessToken, tokens.refreshToken);

    return { status: 'success' };
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    const user = req.user;
    const tokens = await this.authService.generateTokens(user.id, user.email);
    await this.authService.updateRefreshTokenHash(user.id, tokens.refreshToken);

    this.setCookies(res, tokens.accessToken, tokens.refreshToken);

    return { status: 'success' };
  }

  @Roles(ROLE.ADMIN, ROLE.USER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    const userId = req.user.sub;
    await this.authService.logout(userId);

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    return { status: 'success' };
  }

  @Roles(ROLE.ADMIN, ROLE.USER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userId = req.user.sub;
    const userRefreshToken = req.cookies.refreshToken;

    const tokens = await this.authService.refreshTokens(
      userId,
      userRefreshToken,
    );

    this.setCookies(res, tokens.accessToken, tokens.refreshToken);

    return { status: 'success' };
  }

  private setCookies(res: Response, accessToken: string, refreshToken: string) {
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }
}
