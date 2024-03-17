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

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(
    @Body()
    signUpDto: {
      fname: string;
      lname: string;
      country: string;
      phone: string;
      username: string;
      email: string;
      password: string;
    },
  ) {
    // convert it to User form
    // console.log(signUpDto);
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
