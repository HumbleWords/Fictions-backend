import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Work } from '@prisma/client';

@Injectable()
export class WorksService {
  constructor(private prisma: PrismaService) {}

  async getAll(
    params: {
      skip: number;
      take: number;
      where: Prisma.WorkWhereInput;
      orderBy: Prisma.Enumerable<Prisma.WorkOrderByWithRelationInput>;
    },
    search: string,
  ): Promise<Work[]> {
    params.where = {
      ...params.where,
      status: 'PUBLISHED',
    };

    params.where =
      search === 'null'
        ? params.where
        : {
            ...params.where,
            OR: [
              {
                title: { contains: search, mode: 'insensitive' },
              },
              {
                tags: {
                  some: {
                    name: { contains: search, mode: 'insensitive' },
                  },
                },
              },
              {
                fandoms: {
                  some: {
                    name: { contains: search, mode: 'insensitive' },
                  },
                },
              },
              {
                description: { contains: search, mode: 'insensitive' },
              },
            ],
          };

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
        parts: {
          select: {
            _count: {
              select: {
                comments: {
                  where: {
                    parentId: null,
                  },
                },
              },
            },
          },
        },
        _count: {
          select: {
            favoritedBy: true,
            parts: true,
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
    search: string,
  ) {
    params.where = { ...params.where, authorId: userId };

    params.where =
      search === 'null'
        ? params.where
        : {
            ...params.where,
            OR: [
              {
                title: { contains: search, mode: 'insensitive' },
              },
              {
                tags: {
                  some: {
                    name: { contains: search, mode: 'insensitive' },
                  },
                },
              },
              {
                fandoms: {
                  some: {
                    name: { contains: search, mode: 'insensitive' },
                  },
                },
              },
              {
                description: { contains: search, mode: 'insensitive' },
              },
            ],
          };

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
        parts: {
          select: {
            _count: {
              select: {
                comments: {
                  where: {
                    parentId: null,
                  },
                },
              },
            },
          },
        },
        _count: {
          select: {
            favoritedBy: true,
            parts: true,
          },
        },
      },
    });
    return works;
  }

  async getFavoriteWorks(
    params: {
      skip: number;
      take: number;
      where: Prisma.WorkWhereInput;
      orderBy: Prisma.Enumerable<Prisma.WorkOrderByWithRelationInput>;
    },
    userId: number,
    search: string,
  ): Promise<Work[]> {
    params.where = {
      ...params.where,
      status: 'PUBLISHED',
      favoritedBy: { some: { id: userId } },
    };

    params.where =
      search === 'null'
        ? params.where
        : {
            ...params.where,
            OR: [
              {
                title: { contains: search, mode: 'insensitive' },
              },
              {
                tags: {
                  some: {
                    name: { contains: search, mode: 'insensitive' },
                  },
                },
              },
              {
                fandoms: {
                  some: {
                    name: { contains: search, mode: 'insensitive' },
                  },
                },
              },
              {
                description: { contains: search, mode: 'insensitive' },
              },
            ],
          };

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
        parts: {
          select: {
            _count: {
              select: {
                comments: {
                  where: {
                    parentId: null,
                  },
                },
              },
            },
          },
        },
        _count: {
          select: {
            favoritedBy: true,
            parts: true,
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
            order: true,
            _count: {
              select: {
                comments: {
                  where: {
                    parentId: null,
                  },
                },
              },
            },
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
        _count: {
          select: {
            favoritedBy: true,
            parts: true,
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
            order: true,
            _count: {
              select: {
                comments: {
                  where: {
                    parentId: null,
                  },
                },
              },
            },
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
        _count: {
          select: {
            favoritedBy: true,
            parts: true,
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

  async addToFavorites(id: number, userId: number) {
    const work = await this.prisma.work.update({
      where: {
        id: id,
      },
      data: {
        favoritedBy: {
          connect: {
            id: userId,
          },
        },
      },
      select: { id: true },
    });

    return work;
  }

  async removeFromFavorites(id: number, userId: number) {
    const work = await this.prisma.work.update({
      where: {
        id: id,
      },
      data: {
        favoritedBy: {
          disconnect: {
            id: userId,
          },
        },
      },
      select: { id: true },
    });

    return work;
  }
}
