// auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JWTService } from './auth/JWTService';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JWTService) {} // ✅ private!

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.cookies?.accessToken;

    if (!accessToken) {
      throw new UnauthorizedException('Token missing');
    }

    try {
      const payload = this.jwtService.verifyTokenOnly(accessToken);
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