import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto, RegisterUserSchema } from './dto/register-auth.dto';
import { LoginUserDto } from "./dto/login-auth.dto";
import { ZodValidationPipe } from 'nestjs-zod';
import { JWTService } from './JWTService';
import {type Response,type Request } from 'express';
import { setAuthCookie} from 'src/utils';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService:JWTService;
    
  ) {}

  @Post('register')
    register(
    @Body(new ZodValidationPipe(RegisterUserSchema)) dto: RegisterUserDto, // ✅ validated DTO
    @Res({ passthrough: true }) res: Response, @Req() req:Request
  ) {
    // 1. Generate tokens
    const { accessToken, refreshToken } = this.jwtService.createToken(dto.email); 
  setAuthCookie(res,accessToken,"accessToken","accessToken")
  setAuthCookie(res,refreshToken,"refreshToken","refreshToken")
  console.log(req.cookies)
    const user = this.authService.register(dto);

    return { user, accessToken };
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
