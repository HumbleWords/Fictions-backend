import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';
import { PublicUserInfo } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAll(params: {
    skip: number;
    take: number;
    where: Prisma.UserWhereInput;
    orderBy: Prisma.Enumerable<Prisma.UserOrderByWithRelationInput>;
  }): Promise<PublicUserInfo[]> {
    console.log(JSON.stringify({params}))
    const users = this.prisma.user.findMany({
      ...params,
      select: {
        id: true,
        username: true,
      },
    });
    return users;
  }

  async getById(id: number): Promise<PublicUserInfo> {
    const user = this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
      },
    });
    return user;
  }

  async getByUsername(username: string): Promise<PublicUserInfo> {
    const user = this.prisma.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
      },
    });
    return user;
  }

  async getByUsernameWithPassword(username: string): Promise<User> {
    const user = this.prisma.user.findUnique({ where: { username } });
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
