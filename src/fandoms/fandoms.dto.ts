import { ApiProperty } from '@nestjs/swagger';
import { OrderByEnum } from 'src/common/common.dto';

export class FindAllFandomsDto {
  skip: number;
  take: number;
  where: string;
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
  @ApiProperty({default: "Example Fandom"})
  name: string;
}

export class UpdateFandomDto {
  name: string;
}
