import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto, RegisterUserSchema } from './dto/register-auth.dto';
import { LoginUserDto } from "./dto/login-auth.dto";
import { ZodValidationPipe } from 'nestjs-zod';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  regsiter(@Body(new ZodValidationPipe(RegisterUserSchema)) registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }
  @Post("login")
  login(@Body(new ZodValidationPipe(LoginUserDto)) loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
  @Get("logout")
  loogout(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

}
