import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';
import { OrderByEnum } from 'src/common/common.dto';

export class FindAllCommentsDto {
  @ApiProperty({ default: 0 })
  @IsInt()
  @Transform(({ value }) => Number(value))
  skip: number;
  @ApiProperty({ default: 20 })
  @IsInt()
  @Transform(({ value }) => Number(value))
  take: number;
  @ApiProperty({ default: 0 })
  @IsInt()
  @Transform(({ value }) => Number(value))
  workPartId: number;
  @ApiProperty({ default: null, required: false })
  @Transform(({ value }) => (value ? Number(value) : undefined))
  parentId?: number;
  @ApiProperty({ enum: OrderByEnum, default: OrderByEnum.asc })
  orderBy: OrderByEnum;
}

export class FindAllCommentsProcessedDto {
  skip: number;
  take: number;
  where: {
    workPartId: number;
    parentId: number | null;
  };
  orderBy: {
    createdAt: 'asc' | 'desc';
  };
}

export class CreateCommentDto {
  @ApiProperty({ default: '' })
  text: string;
  @ApiProperty({ default: 0 })
  @IsInt()
  @Transform(({ value }) => Number(value))
  workPartId: number;
  @ApiProperty({ default: null })
  parentId?: number | null;
}

export class CreateCommentProcessedDto {
  text: string;
  user: {
    connect: {
      id: number;
    };
  };
  workPart: {
    connect: {
      id: number;
    };
  };
  parent?: {
    connect: {
      id: number;
    };
  };
}

export class UpdateCommentDto {
  @ApiProperty({ default: '' })
  text: string;
}
