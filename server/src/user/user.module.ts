import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database.module';
import { userProvider  } from "./user.provider";
import { AuthModule } from 'src/auth/auth.module';
@Module({
  controllers: [UserController],
  providers: [UserService,...userProvider],
  imports:[DatabaseModule],
  exports:[UserService]
})
export class UserModule {}
