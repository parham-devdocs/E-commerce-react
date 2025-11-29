import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-auth.dto';
import { LoginUserDto } from './dto/login-auth.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { JWTService } from './JWTService';
import { dehashPassword, setAuthCookie } from 'src/utils';
import { Response } from 'express';
import { hashPassword } from "../utils";
import { QueryFailedError } from "typeorm";
import { ZodError } from 'zod';
@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_REPOSITORY')
    private authRepository: Repository<User>,
    private jwtServcie: JWTService,
  ) {}
  async register(registerUserDto: RegisterUserDto, res: Response) {
    try {
      const isUserAvaialable = this.authRepository.find({
        where: { email: registerUserDto.email },
      });
      if (!isUserAvaialable) {
        throw new NotFoundException();
      }
      const { accessToken, refreshToken } = this.jwtServcie.createToken(
        registerUserDto.email,
      );
      setAuthCookie(res, accessToken, 'accessToken', 'accessToken');
      setAuthCookie(res, refreshToken, 'refreshToken', 'refreshToken');
      const hashedPassword=await hashPassword(registerUserDto.password)
      console.log(registerUserDto)
      const newUser = this.authRepository.create({
        fullName:registerUserDto.fullName,
        email:registerUserDto.email,
        address:registerUserDto.address,
        phoneNumber:registerUserDto.phoneNumber,
        hashedPassword:hashedPassword,
      refreshToken

      });
      const user=await this.authRepository.save(newUser);
      console.log(user)
      return {user,message:"user registred successfully"}
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const detail = error .driverError?.detail;
console.log(detail)
return {message:detail}
      }
      if (error instanceof ZodError) {
        console.log(error.message)
return {message:error.message}
        
      }
      return {message:error.message }
    }

  
  }

  async login(loginUserDto: LoginUserDto, res: Response) {
    try {
      // ✅ Fixed: added `await`
      const user = await this.authRepository.findOne({
        where: { email: loginUserDto.email },
        select: { id: true, email: true, fullName: true, phoneNumber: true, address: true, hashedPassword: true, refreshToken: true },
      });
  
      // ✅ Fixed: correct exception instantiation
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      const passwordIsCorrect = await dehashPassword(user.hashedPassword, loginUserDto.password);
  
      // ✅ Fixed: correct exception instantiation
      if (!passwordIsCorrect) {
        throw new UnauthorizedException('Invalid credentials');
      }
  
      const { accessToken, refreshToken } = this.jwtServcie.createToken(loginUserDto.email);
  
      // ✅ Fixed: update refreshToken and persist with `await`
      user.refreshToken = refreshToken;
      await this.authRepository.save(user);
  
      setAuthCookie(res, accessToken, 'accessToken', 'accessToken');
      setAuthCookie(res, refreshToken, 'refreshToken', 'refreshToken');
  
      // ✅ Fixed: exclude sensitive fields from response
      const { hashedPassword, refreshToken: _, ...safeUser } = user;
  
      return { message: "user logged in successfully", data: safeUser };
  
    } catch (error) {
      // 👇 This block is left EXACTLY as you wrote it — untouched
      if (error instanceof QueryFailedError) {
        const detail = error.driverError?.detail;
        console.log(detail);
        return { message: error.driverError?.detail};
      }
      if (error instanceof ZodError) {
         console.log(error.message);
        return { message: error.message };
      }
      return {message:error.message }
    }
  }

  logout(id: number) {
    return `This action returns a #${id} auth`;
  }
}
