import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(pass, user.hashedPassword);
      if (isMatch) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { hashedPassword, ...result } = user;
        const payload = { id: user.id, image: user.image };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
      throw new UnauthorizedException('Invalid credentials');
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
