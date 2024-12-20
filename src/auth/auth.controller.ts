import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoggedInDto } from './strategies/dto/logged-in.dto';
import { PerfLoggerInterceptor } from '../interceptors/perf-logger.interceptor';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth.guard';
import { Oauth2AuthGuard } from './guards/oauth2-auth.guard';

@UseInterceptors(PerfLoggerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() request: { user: LoggedInDto }) {
    return this.authService.login(request.user);
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  refreshToken(@Request() request: { user: LoggedInDto }) {
    return this.authService.refreshToken(request.user);
  }

  @Get('login-oauth2-redirect-url')
  loginOauth2RedirectUrl(): { redirectUrl: string } {
    return { redirectUrl: this.authService.getOauth2RedirectUrl() };
  }

  @UseGuards(Oauth2AuthGuard)
  @Post('login-oauth2')
  loginKeycloak(@Request() request: { user: LoggedInDto }) {
    return this.authService.login(request.user);
  }
}
