export class FindAllDto {
  skip: number;
  take: number;
  where: { username: string };
  orderBy: {
    username: 'asc' | 'desc';
  };
}

export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  birthdate: string;
  role: 'USER' | 'ADMIN';
}

export class UpdateUserDto {
  username: string;
  email: string;
  password: string;
  birthdate: string;
  role: 'USER' | 'ADMIN';
}
