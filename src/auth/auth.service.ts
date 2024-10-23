import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoggedInDto } from './strategies/dto/logged-in.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
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

  login(user: LoggedInDto): string {
    const payload: LoggedInDto = { ...user, sub: user.user_id };
    return this.jwtService.sign(payload, { expiresIn: '1h' });
  }
}
