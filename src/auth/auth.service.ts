import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/bcrypt.service';
import { UsersService } from 'src/users/users.service';
import { RegisterDto, ValidatedResult } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private bcryptService: BcryptService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.getByUsernameWithPassword(username);
    if (user && (await this.bcryptService.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: ValidatedResult) {
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(data: RegisterDto) {
    const { password, ...credentials } = data;
    const hashedPassword = await this.bcryptService.hash(password);
    const user = await this.usersService.create({
      ...credentials,
      password: hashedPassword,
    });
    if (!user) return { message: 'User already exists' };
    return user;
  }
}
