import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Comment } from '@prisma/client';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async getAll(params: {
    skip: number;
    take: number;
    where: Prisma.CommentWhereInput;
    orderBy: Prisma.Enumerable<Prisma.CommentOrderByWithRelationInput>;
  }): Promise<Comment[]> {
    const comments = this.prisma.comment.findMany({ ...params });
    return comments;
  }

  async getById(id: number): Promise<Comment> {
    const comment = this.prisma.comment.findUnique({ where: { id } });
    return comment;
  }

  async create(data: Prisma.CommentCreateInput): Promise<Comment> {
    const comment = this.prisma.comment.create({ data });
    return comment;
  }

  async update(id: number, data: Prisma.CommentUpdateInput, userId): Promise<Comment> {
    const commentCheck = await this.prisma.comment.findUnique({
      where: { id },
    });
    if (!(commentCheck.userId === userId)) {
      throw new ForbiddenException();
    }
    const comment = this.prisma.comment.update({ where: { id }, data });
    return comment;
  }

  async delete(id: number, userId: number): Promise<Comment> {
    const commentCheck = await this.prisma.comment.findUnique({
      where: { id },
    });
    if (!(commentCheck.userId === userId)) {
      throw new ForbiddenException();
    }
    const comment = this.prisma.comment.delete({ where: { id } });
    return comment;
  }
}
