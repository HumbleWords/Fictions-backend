import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsEmail, IsString, Length, Matches } from 'class-validator';
import { OrderByEnum } from 'src/common/common.dto';
import { Role } from 'src/common/role.enum';

export class FindAllUsersDto {
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

export class FindAllUsersProcessedDto {
  skip: number;
  take: number;
  where: { username: { contains: string; mode: 'insensitive' } };
  orderBy: {
    username: 'asc' | 'desc';
  };
}

export class CreateUserDto {
  @ApiProperty({ default: 'NewUserName' })
  @IsString()
  @Length(8, 64)
  username: string;
  @ApiProperty({ default: 'newuser@example.mail' })
  @IsEmail()
  email: string;
  @ApiProperty({ default: 'Riddle@MeThis123' })
  @Length(8, 64)
  @Matches(
    /(?=.*\d)(?=.*\W+)(?=.*[ -\/:-@\[-\`{-~]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    {
      message: 'password too weak',
    },
  )
  password: string;
  @ApiProperty()
  birthdate: string;
  @ApiProperty({ enum: Role, default: Role.User })
  role: Role;
}

export class UpdateUserDto {
  @ApiProperty({ default: 'NewUserName' })
  @IsString()
  @Length(8, 64)
  username: string;
  @ApiProperty({ default: 'newuser@example.mail' })
  @IsEmail()
  email: string;
  @ApiProperty({ default: 'Riddle@MeThis123' })
  @Length(8, 64)
  @Matches(
    /(?=.*\d)(?=.*\W+)(?=.*[ -\/:-@\[-\`{-~]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    {
      message: 'password too weak',
    },
  )
  password: string;
  @ApiProperty()
  birthdate: string;
  @ApiProperty({ enum: Role, default: Role.User })
  role: Role;
}

export class PublicUserInfo {
  @ApiProperty()
  id: number;
  @ApiProperty()
  username: string;
}
