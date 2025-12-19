// jwt.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import  jwt, { JwtPayload } from 'jsonwebtoken';
import { email } from 'zod';

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class JWTService {
  
  createToken(email: string,role:string): TokenPair {
    const payload = { email,role };

    const accessToken = jwt.sign(
      payload, // ✅
      process.env.JWT_ACCESS_SECRET as string,
      { expiresIn: '2h' }
    );

    const refreshToken = jwt.sign(
      payload, // ✅ same object — NOT `email`
      process.env.JWT_REFRESH_SECRET as string,
      { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
  }

  
  
// JWTService.ts
verifyTokenOnly(token: string): JwtPayload {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as JwtPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedException('Token expired');
    }
    throw new UnauthorizedException('Invalid token');
  }
}
}