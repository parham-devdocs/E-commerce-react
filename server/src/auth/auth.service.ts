import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-auth.dto';
import { LoginUserDto } from "./dto/login-auth.dto";
@Injectable()
export class AuthService {
  register(registerUserDto:RegisterUserDto) {
    return 'This action adds a new auth';
  }

  login(loginUserDto:LoginUserDto) {
 
    return `This action returns all auth`;
  }

  logout(id: number) {
    return `This action returns a #${id} auth`;
  }
}
