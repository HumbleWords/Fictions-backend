import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsEmail, IsString, Length, Matches } from 'class-validator';

export class LoginDto {
  @ApiProperty({ default: 'RegUser' })
  username: string;
  @ApiProperty({ default: 'reguser123' })
  password: string;
}

export class RegisterDto {
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
  @ApiProperty({ default: '2003-03-31' })
  birthdate: string;
}

export class ValidatedResult {
  id: number;
  email: string;
  username: string;
  birthdate: string;
  role: string;
}

export class UserJwtSignedModel {
  id: number;
  username: string;
  role: string;
}
