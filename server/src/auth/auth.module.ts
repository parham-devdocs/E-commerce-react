import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JWTService } from './JWTService';

@Module({
  controllers: [AuthController],
  providers: [AuthService,JWTService],
  
})
export class AuthModule {}
