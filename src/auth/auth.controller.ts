import { Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoggedInDto } from './strategies/dto/logged-in.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() request: { user: LoggedInDto }, @Res() response: Response) {
    const access_token = this.authService.login(request.user);

    response.setHeader('Authorization', `Bearer ${access_token}`);

    return response.status(200).json({
      message: 'Login successful',
    });
  }
}
