import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, WorkPart } from '@prisma/client';

@Injectable()
export class WorkPartsService {
  constructor(private prisma: PrismaService) {}

  async getAll(params: {
    where: Prisma.WorkPartWhereInput;
  }): Promise<WorkPart[]> {
    params.where = { ...params.where, status: 'PUBLISHED' };
    const workParts = this.prisma.workPart.findMany({
      ...params,
      orderBy: {
        order: 'asc',
      },
    });
    return workParts;
  }

  async getById(id: number): Promise<WorkPart> {
    const workPart = this.prisma.workPart.findUnique({ where: { id } });
    if (!((await workPart).status === 'PUBLISHED')) return null;
    return workPart;
  }

  async create(
    userId: number,
    data: Prisma.WorkPartCreateInput,
  ): Promise<WorkPart> {
    const checkWork = await this.prisma.work.findUnique({
      where: { id: data.work.connect.id },
    });
    if (!(checkWork.authorId == userId)) {
      throw new ForbiddenException();
    }
    const workPart = this.prisma.workPart.create({ data });
    return workPart;
  }

  async update(
    id: number,
    data: Prisma.WorkPartUpdateInput,
    userId: number,
  ): Promise<WorkPart> {
    const checkWork = await this.prisma.work.findUnique({
      where: { id },
    });
    if (!(checkWork.authorId == userId)) {
      throw new ForbiddenException();
    }
    const workPart = this.prisma.workPart.update({ where: { id }, data });
    return workPart;
  }

  async delete(id: number, userId: number): Promise<WorkPart> {
    const workId = (await this.prisma.workPart.findUnique({ where: { id } }))
      .workId;
    const checkWork = await this.prisma.work.findUnique({
      where: { id: workId },
    });
    if (!(checkWork.authorId == userId)) {
      throw new ForbiddenException();
    }
    const workPart = this.prisma.workPart.delete({ where: { id } });
    return workPart;
  }
}
