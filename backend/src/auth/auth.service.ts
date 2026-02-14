import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './types/jwtPayload.type';
import { ROLE } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async generateTokens(userId: number, email: string, role: ROLE) {
    const jwtPayload: JwtPayload = { sub: userId, email, role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.getOrThrow<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.getOrThrow<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async addRefreshTokenHash(userId: number, refreshToken: string) {
    const hash = await bcrypt.hash(refreshToken, 10);
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { hashedRefreshTokens: true },
    });

    const currentTokens = user?.hashedRefreshTokens || [];

    const maxTokens =
      this.configService.getOrThrow<number>('MAX_REFRESH_TOKENS');
    const updatedTokens = [...currentTokens, hash].slice(-maxTokens);

    await this.prisma.user.update({
      where: { id: userId },
      data: { hashedRefreshTokens: updatedTokens },
    });
  }

  async clearAllRefreshTokens(userId: number) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { hashedRefreshTokens: [] },
    });
  }

  async register(dto: RegisterUserDto) {
    if (dto.password !== dto.passwordConfirm) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: hashedPassword,
        cart: {
          create: {},
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    const { accessToken, refreshToken } = await this.generateTokens(
      newUser.id,
      newUser.email,
      ROLE.USER,
    );
    await this.addRefreshTokenHash(newUser.id, refreshToken);

    return {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: ROLE.USER,
      accessToken,
      refreshToken,
    };
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, hashedRefreshTokens, ...result } = user;
      return result;
    }
    return null;
  }

  async logout(userId: number, currentRefreshToken?: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { hashedRefreshTokens: true },
    });

    if (!user || user.hashedRefreshTokens.length === 0) {
      return;
    }

    if (currentRefreshToken) {
      const remainingTokens: string[] = [];
      for (const hash of user.hashedRefreshTokens) {
        const matches = await bcrypt.compare(currentRefreshToken, hash);
        if (!matches) {
          remainingTokens.push(hash);
        }
      }

      await this.prisma.user.update({
        where: { id: userId },
        data: { hashedRefreshTokens: remainingTokens },
      });
    } else {
      await this.clearAllRefreshTokens(userId);
    }
  }

  async refreshTokens(userId: number, userRefreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.hashedRefreshTokens.length === 0) {
      throw new ForbiddenException('Access Denied');
    }

    let tokenFound = false;
    let matchedTokenIndex = -1;

    for (let i = 0; i < user.hashedRefreshTokens.length; i++) {
      const isMatch = await bcrypt.compare(
        userRefreshToken,
        user.hashedRefreshTokens[i],
      );
      if (isMatch) {
        tokenFound = true;
        matchedTokenIndex = i;
        break;
      }
    }

    if (!tokenFound) {
      await this.clearAllRefreshTokens(userId);
      throw new ForbiddenException(
        'Access Denied - All sessions have been terminated',
      );
    }

    const { accessToken, refreshToken } = await this.generateTokens(
      user.id,
      user.email,
      user.role,
    );

    const updatedTokens = [...user.hashedRefreshTokens];
    const newHash = await bcrypt.hash(refreshToken, 10);
    updatedTokens[matchedTokenIndex] = newHash;

    await this.prisma.user.update({
      where: { id: userId },
      data: { hashedRefreshTokens: updatedTokens },
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
