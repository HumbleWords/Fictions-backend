import { UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, passport: string) {
    const user = await this.authService.validateUser(username, passport);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
