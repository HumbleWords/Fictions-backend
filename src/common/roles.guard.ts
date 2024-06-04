import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.get<string>('role', context.getHandler());
    if (!role) return true;
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user && user.role && (user.role === role || user.role === Role.Admin)) {
      return true;
    }
    return false;
  }
}
