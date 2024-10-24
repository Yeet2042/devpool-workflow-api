import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoggedInDto } from './strategies/dto/logged-in.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { v7 as uuidv7 } from 'uuid';

@Injectable()
export class AuthService {
  private logger = new Logger();

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

  async validateUserByAccessToken(accessToken: string): Promise<LoggedInDto> {
    const userInfo: { email: string } =
      await this.jwtService.decode(accessToken);

    if (!userInfo || !userInfo.email) {
      this.logger.debug(
        `Invalid token: email not found in token`,
        AuthService.name,
      );
      return null;
    }

    const user = await this.userService.findOneByEmail(userInfo.email);

    if (!user) {
      this.logger.debug(
        `user not found: email=${userInfo.email}`,
        AuthService.name,
      );
      return null;
    }

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
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

  getOauth2RedirectUrl(): string {
    const auth_url = this.configService.get('OAUTH2_AUTH_URL');
    const client_id = this.configService.get('OAUTH2_CLIENT_ID');
    const redirect_uri = this.configService.get('OAUTH2_CALLBACK_URL');
    const scope = encodeURIComponent(this.configService.get('OAUTH2_SCOPE'));
    const response_type = this.configService.get('OAUTH2_RESPONSE_TYPE');
    const state = uuidv7();
    const url = `${auth_url}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=${response_type}&state=${state}`;
    return url;
  }
}
