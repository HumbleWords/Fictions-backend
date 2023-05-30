import { ApiProperty } from '@nestjs/swagger';

export enum OrderByEnum {
  asc = 'asc',
  desc = 'desc',
}

export class ConnectRecordDto {
  @ApiProperty({ default: 0 })
  id: number;
}

export enum StatusEnum {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  HIDDEN = 'HIDDEN',
}
