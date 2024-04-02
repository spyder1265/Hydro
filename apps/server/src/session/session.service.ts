import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Session, User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SessionService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async create(user: User, token: string): Promise<Session> {
    const session_expiryDate = new Date();
    session_expiryDate.setMonth(session_expiryDate.getMonth() + 1);

    const sessionToken = await this.jwt.sign({ id: user.id, token: token });

    if (sessionToken) {
      return this.prisma.session.create({
        data: {
          expires: session_expiryDate,
          accessToken: token,
          userId: user.id,
          sessionToken: sessionToken,
        },
      });
    }
  }

  findAll() {
    return `This action returns all session`;
  }

  findOne(id: number) {
    return `This action returns a #${id} session`;
  }

  async update(id: string): Promise<Session> {
    const session = await this.prisma.session.findUnique({
      where: { id: id },
    });

    if (session) {
      const session_expiryDate = new Date(session.expires);
      session_expiryDate.setMonth(session_expiryDate.getMonth() + 1);

      const token = await this.jwt.sign({ id: session.userId });

      if (token) {
        return this.prisma.session.update({
          where: { id: id },
          data: {
            expires: session_expiryDate,
            accessToken: token,
          },
        });
      }
    }
  }

  remove(id: number) {
    return `This action removes a #${id} session`;
  }
}
