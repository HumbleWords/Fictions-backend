import { Injectable } from '@nestjs/common/decorators';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Fandom } from '@prisma/client';

@Injectable()
export class FandomsService {
  constructor(private prisma: PrismaService) {}

  async getAll(params: {
    skip: number;
    take: number;
    where: Prisma.FandomWhereInput;
    orderBy: Prisma.Enumerable<Prisma.FandomOrderByWithRelationInput>;
  }): Promise<Fandom[]> {
    const fandoms = this.prisma.fandom.findMany({ ...params });
    return fandoms;
  }

  async getById(id: number): Promise<Fandom> {
    const fandom = this.prisma.fandom.findUnique({
      where: { id },
      include: {
        works: {
          where: {
            status: 'PUBLISHED',
          },
          include: {
            author: {
              select: {
                username: true,
              },
            },
          },
        },
        _count: {
          select: {
            users: true,
            works: { where: { status: 'PUBLISHED' } },
          },
        },
      },
    });
    return fandom;
  }

  async create(data: Prisma.FandomCreateInput): Promise<Fandom> {
    const fandom = this.prisma.fandom.create({ data });
    return fandom;
  }

  async update(id: number, data: Prisma.FandomUpdateInput): Promise<Fandom> {
    const fandom = this.prisma.fandom.update({ where: { id }, data });
    return fandom;
  }

  async delete(id: number): Promise<Fandom> {
    const fandom = this.prisma.fandom.delete({ where: { id } });
    return fandom;
  }

  async addToFavorites(id: number, userId: number) {
    const fandom = this.prisma.fandom.update({
      where: {
        id: id,
      },
      data: {
        users: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return fandom;
  }

  async removeFromFavorites(id: number, userId: number) {
    const fandom = this.prisma.fandom.update({
      where: {
        id: id,
      },
      data: {
        users: {
          disconnect: {
            id: userId,
          },
        },
      },
    });

    return fandom;
  }
}
