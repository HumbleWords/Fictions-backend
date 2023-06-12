import { Injectable } from '@nestjs/common/decorators';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Tag } from '@prisma/client';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async getAll(params: {
    skip: number;
    take: number;
    where: Prisma.TagWhereInput;
    orderBy: Prisma.Enumerable<Prisma.TagOrderByWithRelationInput>;
  }): Promise<Tag[]> {
    const tags = this.prisma.tag.findMany({ ...params });
    return tags;
  }

  async getById(id: number): Promise<Tag> {
    const tag = this.prisma.tag.findUnique({
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
    return tag;
  }

  async create(data: Prisma.TagCreateInput): Promise<Tag> {
    const tag = this.prisma.tag.create({ data });
    return tag;
  }

  async update(id: number, data: Prisma.TagUpdateInput): Promise<Tag> {
    const tag = this.prisma.tag.update({ where: { id }, data });
    return tag;
  }

  async delete(id: number): Promise<Tag> {
    const tag = this.prisma.tag.delete({ where: { id } });
    return tag;
  }

  async addToFavorites(id: number, userId: number) {
    const tag = this.prisma.tag.update({
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

    return tag;
  }

  async removeFromFavorites(id: number, userId: number) {
    const tag = this.prisma.tag.update({
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

    return tag;
  }
}
