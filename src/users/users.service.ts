import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, User } from '@prisma/client';
import {
  PrivateUserInfo,
  PublicDeletedUserInfo,
  PublicUserInfo,
  UserJwtSignedModel,
} from './users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAll(params: {
    skip: number;
    take: number;
    where: Prisma.UserWhereInput;
    orderBy: Prisma.Enumerable<Prisma.UserOrderByWithRelationInput>;
  }): Promise<PublicUserInfo[]> {
    console.log(JSON.stringify({ params }));
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

  async getMe(userId: number): Promise<PrivateUserInfo> {
    const user = this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        birthdate: true,
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

  async create(data: Prisma.UserCreateInput): Promise<UserJwtSignedModel> {
    const userExistsWithEmail = this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (await userExistsWithEmail) {
      throw new ConflictException(
        'Пользователь с таким адресом почты уже существует',
      );
    }
    const userExistsWithUsername = this.prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });
    if (await userExistsWithUsername) {
      throw new ConflictException('Пользователь с таким именем уже существует');
    }
    const user = this.prisma.user.create({
      data,
      select: {
        id: true,
        username: true,
        role: true,
      },
    });
    return user;
  }

  async update(
    id: number,
    data: Prisma.UserUpdateInput,
  ): Promise<PublicUserInfo> {
    const user = this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        username: true,
      },
    });
    return user;
  }

  async delete(id: number): Promise<PublicDeletedUserInfo> {
    const user = this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
      select: {
        id: true,
        username: true,
        deletedAt: true,
      },
    });
    return user;
  }
}
