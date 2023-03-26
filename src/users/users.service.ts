import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAll(params: {
    skip: number;
    take: number;
    where: Prisma.UserWhereInput;
    orderBy: Prisma.Enumerable<Prisma.UserOrderByWithRelationInput>;
  }): Promise<User[]> {
    const users = this.prisma.user.findMany({ ...params });
    return users;
  }

  async getById(id: number): Promise<User> {
    const user = this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = this.prisma.user.create({ data });
    return user;
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    const user = this.prisma.user.update({ where: { id }, data });
    return user;
  }

  async delete(id: number): Promise<User> {
    const user = this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return user;
  }
}
