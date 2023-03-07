import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/common/role.enum';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Prisma } from '@prisma/client';

export class CreateUserDto implements Prisma.UserCreateInput {
  @ApiProperty()
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  birthdate: Date;

  @ApiProperty()
  role: Role;
}

export class UpdateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  birthdate: Date;

  @ApiProperty()
  role: Role;
}

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  birthdate: Date;

  @ApiProperty()
  role: Role;
}
