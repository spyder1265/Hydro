import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Ip,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(
    @Body() signInDto: { email: string; password: string },
    @Ip() ip: string,
  ) {
    console.log(
      'login => email : ' +
        signInDto.email +
        ', password : ' +
        signInDto.password +
        ', ip : ' +
        ip,
    );
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
