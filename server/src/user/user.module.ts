import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database.module';
import { userProvider  } from "./user.provider";
import { AuthModule } from 'src/auth/auth.module';
import { AccessContorlService } from 'src/accessControlService';
@Module({
  controllers: [UserController],
  providers: [UserService,...userProvider,AccessContorlService],
  imports:[DatabaseModule,AuthModule],
  exports:[UserService]
})
export class UserModule {}
