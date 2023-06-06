import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Work } from '@prisma/client';

@Injectable()
export class WorksService {
  constructor(private prisma: PrismaService) {}

  async getAll(params: {
    skip: number;
    take: number;
    where: Prisma.WorkWhereInput;
    orderBy: Prisma.Enumerable<Prisma.WorkOrderByWithRelationInput>;
  }): Promise<Work[]> {
    params.where = { ...params.where, status: 'PUBLISHED' };
    const works = this.prisma.work.findMany({
      ...params,
      include: {
        tags: true,
        fandoms: true,
        author: {
          select: {
            username: true,
          },
        },
      },
    });
    return works;
  }

  async getMyWorks(
    params: {
      skip: number;
      take: number;
      where: Prisma.WorkWhereInput;
      orderBy: Prisma.Enumerable<Prisma.WorkOrderByWithRelationInput>;
    },
    userId: number,
  ) {
    params.where = { ...params.where, authorId: userId };
    const works = this.prisma.work.findMany({
      ...params,
      include: {
        tags: true,
        fandoms: true,
        author: {
          select: {
            username: true,
          },
        },
      },
    });
    return works;
  }

  async getMyWorkById(id: number, userId: number) {
    const work = this.prisma.work.findUnique({
      where: { id },
      include: {
        tags: true,
        fandoms: true,
        parts: {
          select: {
            id: true,
            title: true,
            description: true,
            note: true,
            text: true,
            status: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
        author: {
          select: {
            username: true,
          },
        },
      },
    });
    if (!(await work)) {
      return null;
    }
    if (!((await work).authorId === userId)) {
      return null;
    }
    return work;
  }

  async getById(id: number): Promise<Work> {
    const work = this.prisma.work.findUnique({
      where: { id },
      include: {
        tags: true,
        fandoms: true,
        parts: {
          select: {
            id: true,
            title: true,
            description: true,
            note: true,
            text: true,
          },
          orderBy: {
            order: 'asc',
          },
          where: {
            status: 'PUBLISHED',
          },
        },
        author: {
          select: {
            username: true,
          },
        },
      },
    });
    if (!(await work)) {
      return null;
    }
    if (!((await work).status === 'PUBLISHED')) {
      return null;
    }
    return work;
  }

  async create(data: Prisma.WorkCreateInput): Promise<Work> {
    const work = this.prisma.work.create({ data });
    return work;
  }

  async update(
    id: number,
    data: Prisma.WorkUpdateInput,
    userId: number,
  ): Promise<Work> {
    const checkWork = await this.prisma.work.findUnique({ where: { id } });
    if (!(checkWork.authorId == userId)) {
      throw new ForbiddenException();
    }
    await this.prisma.work.update({
      where: { id },
      data: { tags: { set: [] }, fandoms: { set: [] } },
    });
    const work = this.prisma.work.update({ where: { id }, data });
    return work;
  }

  async delete(id: number, userId: number): Promise<Work> {
    const checkWork = await this.prisma.work.findUnique({ where: { id } });
    if (!(checkWork.authorId == userId)) {
      throw new ForbiddenException();
    }
    const work = this.prisma.work.delete({ where: { id } });
    return work;
  }
}
