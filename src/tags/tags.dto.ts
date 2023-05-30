import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt } from "class-validator";
import { OrderByEnum } from "src/common/common.dto";

export class FindAllTagsDto {
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

export class FindAllTagsProcessedDto {
  skip: number;
  take: number;
  where: { name: { contains: string; mode: 'insensitive' } };
  orderBy: {
    name: 'asc' | 'desc';
  };
}

export class CreateTagDto {
  @ApiProperty({ default: 'Example Tag Name' })
  name: string;
}

export class UpdateTagDto {
  @ApiProperty({ default: 'New Example Tag Name' })
  name: string;
}
