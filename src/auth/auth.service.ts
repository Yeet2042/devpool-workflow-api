import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoggedInDto } from './strategies/dto/logged-in.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<LoggedInDto> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      return null;
    }

    if (await bcrypt.compare(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } else {
      return null;
    }
  }

  login(user: LoggedInDto) {
    const payload: LoggedInDto = { ...user, sub: user.user_id };
    const access_token = this.jwtService.sign(payload);

    const refreshTokenSecret = this.configService.get('REFRESH_JWT_SECRET');
    const refreshTokenExpiresIn = this.configService.get(
      'REFRESH_JWT_EXPIRES_IN',
    );

    const refresh_token = this.jwtService.sign(payload, {
      secret: refreshTokenSecret,
      expiresIn: refreshTokenExpiresIn,
    });

    return { access_token, refresh_token };
  }

  refreshToken(loggedInDto: LoggedInDto) {
    const payload: LoggedInDto = { ...loggedInDto, sub: loggedInDto.user_id };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }
}
