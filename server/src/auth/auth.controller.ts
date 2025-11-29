import { Controller, Get, Post, Body,  Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto, RegisterUserSchema } from './dto/register-auth.dto';
import { LoginUserDto } from "./dto/login-auth.dto";
import { ZodValidationPipe } from 'nestjs-zod';
import { JWTService } from './JWTService';
import {type Response,type Request } from 'express';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

  ) {}

  @Post('register')
 async   register(
    @Body(new ZodValidationPipe(RegisterUserSchema))  dto: RegisterUserDto, 
    @Res({ passthrough: true }) res: Response, @Req() req:Request 
  ) {

    const {data,message}:any = await this.authService.register(dto,res);

    return  {message:message , data}
  }
  @Post("login")
 async login(@Body(new ZodValidationPipe(LoginUserDto)) dto: LoginUserDto ,
  @Res({ passthrough: true }) res: Response, @Req() req:Request 
) {
  const {data,message}:{data?:any,message:string} =await this.authService.login(dto,res);
    return  {message:message , data}

  }

  @Get("logout")
  loogout(@Body() registerUserDto: RegisterUserDto) {
    // return this.authService.register(registerUserDto);
  }

}
