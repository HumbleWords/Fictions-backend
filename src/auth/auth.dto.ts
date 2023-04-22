import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ default: 'RegUser' })
  username: string;
  @ApiProperty({ default: 'reguser123' })
  password: string;
}

export class RegisterDto {
  @ApiProperty({ default: 'NewUser' })
  username: string;
  @ApiProperty({ default: 'newuser@example.mail' })
  email: string;
  @ApiProperty({ default: 'newuser123' })
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
