// auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JWTService } from './auth/JWTService';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './customDecorators/publicRoute.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JWTService,private reflector: Reflector) {} // ✅ private!

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.cookies?.accessToken;
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (isPublic) {
      return true; 
    }
    if (!accessToken) {
      throw new UnauthorizedException('Token missing');
    }

    try {
      const payload = this.jwtService.verifyTokenOnly("accessToken",accessToken);
      if (!payload.role) {
        throw new UnauthorizedException('Role missing in token');
      }
      // ✅ Attach user to request for RolesGuard
      request.user = payload;
      return true; 
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}