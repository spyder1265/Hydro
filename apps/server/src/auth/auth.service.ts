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

  async signUp(user: {
    fname: string;
    lname: string;
    country: string;
    phone: string;
    username: string;
    email: string;
    password: string;
  }): Promise<any> {
    console.log(user);
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = await this.usersService.create({
      name: user.fname + ' ' + user.lname,
      email: user.email,
      hashedPassword,
      username: user.username,
      phone: user.phone,
      country: user.country,
    });
    if (newUser) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { hashedPassword: _, ...result } = newUser;
      const payload = { id: newUser.id, image: newUser.image };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
