import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JWTService } from './JWTService';
import { authProvider } from './auth.provider';
import { DatabaseModule } from '../database.module';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from 'src/auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService,JWTService,AuthGuard,UserService,...authProvider],
  imports:[DatabaseModule],
  exports:[AuthService,JWTService,AuthGuard]
  
})
export class AuthModule {}
