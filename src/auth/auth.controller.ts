import {
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoggedInDto } from './strategies/dto/logged-in.dto';
import { PerfLoggerInterceptor } from '../interceptors/perf-logger.interceptor';

@UseInterceptors(PerfLoggerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() request: { user: LoggedInDto }) {
    const access_token = this.authService.login(request.user);

    return { access_token };
  }
}
