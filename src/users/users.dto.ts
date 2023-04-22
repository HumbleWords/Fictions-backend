import { ApiProperty } from '@nestjs/swagger';
import { OrderByEnum } from 'src/common/common.dto';

class UsersWhere {
  @ApiProperty({ type: String, default: '' })
  username: string;
}

class UsersWhereProcessed {
  @ApiProperty({ type: UsersWhere })
  username: UsersWhere;
  @ApiProperty({ type: String })
  mode: 'insensitive';
}

class UsersOrderBy {
  @ApiProperty({ enum: OrderByEnum })
  username: OrderByEnum;
}

export class FindAllUsersDto {
  @ApiProperty({ default: 0 })
  skip: number;
  @ApiProperty({ default: 20 })
  take: number;
  @ApiProperty({ type: UsersWhere })
  where: { username: string };
  @ApiProperty({ type: UsersOrderBy })
  orderBy: {
    username: 'asc' | 'desc';
  };
}

export class FindAllUsersProcessedDto {
  @ApiProperty({ default: 0 })
  skip: number;
  @ApiProperty({ default: 20 })
  take: number;
  @ApiProperty({ type: UsersWhereProcessed })
  where: { username: { contains: string; mode: 'insensitive' } };
  @ApiProperty({ type: UsersOrderBy })
  orderBy: {
    username: 'asc' | 'desc';
  };
}

export class CreateUserDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  birthdate: string;
  @ApiProperty()
  role: 'USER' | 'ADMIN';
}

export class UpdateUserDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  birthdate: string;
  @ApiProperty()
  role: 'USER' | 'ADMIN';
}

export class PublicUserInfo {
  @ApiProperty()
  id: number;
  @ApiProperty()
  username: string;
}
