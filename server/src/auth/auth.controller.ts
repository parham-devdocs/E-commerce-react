import { Controller, Get, Post, Body,  Res, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto, RegisterUserSchema } from './dto/register-auth.dto';
import { LoginUserDto } from "./dto/login-auth.dto";
import { ZodValidationPipe } from 'nestjs-zod';
import { JWTService } from './JWTService';
import {type Response,type Request } from 'express';
import Token from 'src/customDecorators/token.decorator';
import {type tokenType } from 'src/interfaces';
import { UserRole } from './entities/user.entity';
import { ChangeRoleDto } from './dto/change-user-role';
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

  @Post("refresh")
  async refreshRoken(@Token() token:tokenType,@Res({ passthrough: true }) res: Response,@Req() req:Request){
    const {email}=token
    return this.authService.refreshToken(req,res)
  }

  @Post("changeRole")
  async changeRole(@Token() token:tokenType,@Body() body:ChangeRoleDto,@Res({ passthrough: true }) res: Response){
    const {email}=token
    return this.authService.changeRole(email,body.role,res)
  }

  @Get('logout')
  async logout(
    @Token() token: tokenType,
    @Res() res: Response,      
  ) {
      await this.authService.logout(token, res);

 
  }

}
