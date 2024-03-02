import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Ip,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UnauthorizedException } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //post body
  @Post('login')
  @HttpCode(HttpStatus.OK)
  post(@Body() body: { data: { email; password } }, @Ip() ip: string): string {
    const { email, password } = body.data;
    console.log(
      'login => email : ' + email + ', password : ' + password + ', ip : ' + ip,
    );
    if (body.data.password !== '8K1Tj2tdJ3PC6Ze') {
      throw new UnauthorizedException('Invalid password');
    }
    return 'success';
  }
}
