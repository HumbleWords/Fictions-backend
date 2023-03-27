export class LoginDto {
  username: string;
  password: string;
}

export class RegisterDto {
  username: string;
  email: string;
  password: string;
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
