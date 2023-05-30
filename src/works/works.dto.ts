import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';
import {
  ConnectRecordDto,
  OrderByEnum,
  StatusEnum,
} from 'src/common/common.dto';

enum LangEnum {
  zh_ch = 'zh_ch',
  nl = 'nl',
  en = 'en',
  fr = 'fr',
  de = 'de',
  it = 'it',
  ja = 'ja',
  no = 'no',
  pl = 'pl',
  pt = 'pt',
  ru = 'ru',
  es = 'es',
  sv = 'sv',
  vi = 'vi',
}

enum RatingEnum {
  G = 'G',
  PG = 'PG',
  PG_13 = 'PG_13',
  R = 'R',
  NC_17 = 'NC_17',
}

enum CategoryEnum {
  GEN = 'GEN',
  F_M = 'F_M',
  M_M = 'M_M',
  F_F = 'F_F',
  OTHER = 'OTHER',
}

export class FindAllWorksDto {
  @ApiProperty({ default: 0 })
  @IsInt()
  @Transform(({ value }) => Number(value))
  skip: number;
  @ApiProperty({ default: 20 })
  @IsInt()
  @Transform(({ value }) => Number(value))
  take: number;
  @ApiProperty({ type: String, default: '', required: false })
  title: string | null;
  @ApiProperty({ type: String, default: '', required: false })
  author: string | null;
  @ApiProperty({ type: String, default: '', required: false })
  tags: string | null;
  @ApiProperty({ type: String, default: '', required: false })
  fandoms: string | null;
  @ApiProperty({ enum: OrderByEnum })
  orderBy: OrderByEnum;
}

export class FindAllWorksProcessedDto {
  skip: number;
  take: number;
  where: {
    title: string | null;
    author: {
      username: string | null;
    };
    tags: {
      some: {
        name: string | null;
      };
    };
    fandoms: {
      some: {
        name: string | null;
      };
    };
  };
  orderBy: {
    title: 'asc' | 'desc';
  };
}

export class FindMyWorksDto {
  @ApiProperty({ default: 0 })
  @IsInt()
  @Transform(({ value }) => Number(value))
  skip: number;
  @ApiProperty({ default: 20 })
  @IsInt()
  @Transform(({ value }) => Number(value))
  take: number;
  @ApiProperty({ type: String, default: '', required: false })
  title: string | null;
  @ApiProperty({ type: String, default: '', required: false })
  tags: string | undefined;
  @ApiProperty({ type: String, default: '', required: false })
  fandoms: string | undefined;
  @ApiProperty({ enum: OrderByEnum })
  orderBy: OrderByEnum;
}

export class FindMyWorksProcessedDto {
  skip: number;
  take: number;
  where: {
    title: string | null;
    tags: {
      some: {
        name: string | undefined;
      };
    };
    fandoms: {
      some: {
        name: string | undefined;
      };
    };
  };
  orderBy: {
    title: 'asc' | 'desc';
  };
}

export class CreateWorkProcessedDto {
  title: string;
  description: string;
  note: string | null;
  status: StatusEnum;
  lang: LangEnum | null;
  rating: RatingEnum | null;
  category: CategoryEnum | null;
  tags: {
    connect:
      | {
          id: number;
        }[]
      | null;
  };
  fandoms: {
    connect:
      | {
          id: number;
        }[]
      | null;
  };
}

export class CreateWorkDto {
  @ApiProperty({ default: 'Пример названия работы' })
  title: string;
  @ApiProperty({ default: 'Пример описания работы' })
  description: string;
  @ApiProperty({ default: null })
  note: string | null;
  @ApiProperty({
    enum: StatusEnum,
    default: StatusEnum.DRAFT,
  })
  status: StatusEnum;
  @ApiProperty({
    enum: LangEnum,
    nullable: true,
    default: LangEnum.ru,
  })
  lang: LangEnum | null;
  @ApiProperty({
    enum: RatingEnum,
    nullable: true,
    default: null,
  })
  rating: RatingEnum | null;
  @ApiProperty({
    enum: CategoryEnum,
    nullable: true,
    default: null,
  })
  category: CategoryEnum | null;
  @ApiProperty({ type: [ConnectRecordDto], default: [{ id: 1 }] })
  tags: {
    id: number;
  }[];
  @ApiProperty({ type: [ConnectRecordDto], default: [{ id: 1 }] })
  fandoms: {
    id: number;
  }[];
}

export class UpdateWorkProcessedDto {
  title: string;
  description: string;
  note: string | null;
  status: StatusEnum;
  lang: LangEnum | null;
  rating: RatingEnum | null;
  category: CategoryEnum | null;
  tags: {
    connect: {
      id: number;
    }[];
  };
  fandoms: {
    connect: {
      id: number;
    }[];
  };
}

export class UpdateWorkDto {
  @ApiProperty({ default: 'Пример названия работы' })
  title: string;
  @ApiProperty({ default: 'Пример описания работы' })
  description: string;
  @ApiProperty({ default: null })
  note: string | null;
  @ApiProperty({
    enum: StatusEnum,
    default: StatusEnum.DRAFT,
  })
  status: StatusEnum;
  @ApiProperty({
    enum: LangEnum,
    nullable: true,
    default: LangEnum.ru,
  })
  lang: LangEnum | null;
  @ApiProperty({
    enum: RatingEnum,
    nullable: true,
    default: null,
  })
  rating: RatingEnum | null;
  @ApiProperty({
    enum: CategoryEnum,
    nullable: true,
    default: null,
  })
  category: CategoryEnum | null;
  @ApiProperty({ type: [ConnectRecordDto], default: [] })
  tags: {
    id: number;
  }[];
  @ApiProperty({ type: [ConnectRecordDto], default: [] })
  fandoms: {
    id: number;
  }[];
}
