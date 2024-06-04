import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';
import { OrderByEnum } from 'src/common/common.dto';

export class FindAllFandomsDto {
  @ApiProperty({ default: 0 })
  @IsInt()
  @Transform(({ value }) => Number(value))
  skip: number;
  @ApiProperty({ default: 20 })
  @IsInt()
  @Transform(({ value }) => Number(value))
  take: number;
  @ApiProperty({ type: String, default: '', required: false })
  where: string;
  @ApiProperty({ enum: OrderByEnum })
  orderBy: OrderByEnum;
}

export class FindAllFandomsProcessedDto {
  skip: number;
  take: number;
  where: { name: { contains: string; mode: 'insensitive' } };
  orderBy: {
    name: 'asc' | 'desc';
  };
}

export class CreateFandomDto {
  @ApiProperty({ default: 'Example Fandom Name' })
  name: string;
}

export class UpdateFandomDto {
  @ApiProperty({ default: 'New Example Fandom Name' })
  name: string;
}
