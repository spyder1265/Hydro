import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: { email: email },
    });
  }

  async findOneById(id: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: { id: id },
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }
}
