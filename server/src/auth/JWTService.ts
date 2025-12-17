// jwt.service.ts
import { Injectable } from '@nestjs/common';
import  jwt from 'jsonwebtoken';
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
}