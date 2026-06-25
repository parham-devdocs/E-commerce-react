import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AccessControlService, ROLE_KEY } from './accessControlService';
import { UserRole } from './auth/entities/user.entity';
import { IS_PUBLIC_KEY } from './customDecorators/publicRoute.decorator';

export class TokenDto {
  id: number;
  role: UserRole;
}

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private accessControlService: AccessControlService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (isPublic) {
      return true; 
    }
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const {user} = context.switchToHttp().getRequest();
    for (let role of requiredRoles) {
      const result = this.accessControlService.isAuthorized({
        requiredRole: role,
        currentRole:user.role,
      });

      if (result) {
        return true;
      }
    }

    return false;
  }
}