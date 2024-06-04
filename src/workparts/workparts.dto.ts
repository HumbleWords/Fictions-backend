import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';
import { StatusEnum } from 'src/common/common.dto';

export class FindAllWorkPartsDto {
  @ApiProperty({ default: 0 })
  @IsInt()
  @Transform(({ value }) => Number(value))
  skip: number;
  take: number;
  where: {
    workId: number;
  };
  orderBy: {
    order: 'asc' | 'desc';
  };
}

export class FindWorkPartsByWorkIdDto {
  @ApiProperty({ default: 0 })
  @IsInt()
  @Transform(({ value }) => Number(value))
  workId: number;
}

export class FindWorkPartsByWorkIdProcessedDto {
  where: { workId: number };
}

export class CreateWorkPartProcessedDto {
  title: string | null;
  description: string | null;
  note: string | null;
  text: string;
  order: number;
  status: 'DRAFT' | 'PUBLISHED' | 'HIDDEN';
  work: {
    connect: {
      id: number;
    };
  };
}

export class CreateWorkPartDto {
  @ApiProperty({ default: null })
  title: string | null;
  @ApiProperty({ default: null })
  description: string | null;
  @ApiProperty({ default: null })
  note: string | null;
  @ApiProperty({ default: null })
  text: string;
  @ApiProperty({ default: 0 })
  order: number;
  @ApiProperty({ enum: StatusEnum, default: StatusEnum.DRAFT })
  status: StatusEnum;
  @ApiProperty({ default: 0 })
  workId: number;
}

export class UpdateWorkPartProcessedDto {
  title: string | null;
  description?: string | null;
  note?: string | null;
  text: string;
  order: number;
  status: StatusEnum;
}

export class UpdateWorkPartDto {
  title: string | null;
  description?: string | null;
  note?: string | null;
  text: string;
  order: number;
  status: StatusEnum;
}
