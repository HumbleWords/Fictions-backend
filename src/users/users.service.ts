import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(userCreateInput: Prisma.UserCreateInput) {
    return await this.prisma.user.create({data: userCreateInput})
  }
}
