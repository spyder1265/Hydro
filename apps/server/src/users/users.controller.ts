import { Controller, UseGuards, Get, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('user')
  async getUser(@Request() req) {
    const user = await this.usersService.findOneById(req.user.id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hashedPassword, ...result } = user;
    return result;
  }
}
