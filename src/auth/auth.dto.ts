import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({default: "RegUser"})
  username: string;
  @ApiProperty({default: "reguser123"})
  password: string;
}

export class RegisterDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
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
