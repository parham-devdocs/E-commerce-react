import { BadRequestException, HttpException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-auth.dto';
import { LoginUserDto } from './dto/login-auth.dto';
import { Repository } from 'typeorm';
import { AUTH, UserRole } from './entities/user.entity';
import { JWTService } from './JWTService';
import { dehashPassword, setAuthCookie } from 'src/utils';
import {type Response } from 'express';
import { hashPassword } from "../utils";
import { QueryFailedError } from "typeorm";
import { ZodError } from 'zod';
import { tokenType } from 'src/interfaces';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {
  constructor(
    
    @Inject('AUTH_REPOSITORY')
    private authRepository: Repository<AUTH>,
    private jwtServcie: JWTService,
    private userService:UserService
  ) {}
  async register(registerUserDto: RegisterUserDto, res: Response) {
    try {
       await this.userService.findOne(registerUserDto.email)

      const { accessToken, refreshToken } = this.jwtServcie.createToken(
        registerUserDto.email,
        registerUserDto.role
      );
      
      setAuthCookie(res, accessToken, 'accessToken', 'accessToken');
      setAuthCookie(res, refreshToken, 'refreshToken', 'refreshToken');
      const hashedPassword=await hashPassword(registerUserDto.password)
      const newUser = this.authRepository.create({
        fullName:registerUserDto.fullName,
        email:registerUserDto.email,
        address:registerUserDto.address,
        phoneNumber:registerUserDto.phoneNumber,
        hashedPassword:hashedPassword,
      refreshToken

      });
      const user=await this.authRepository.save(newUser);
      return {user,message:"user registred successfully"}
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const detail = error .driverError?.detail;

        throw new BadRequestException(detail)

      }
      if (error instanceof ZodError ) {
        throw new BadRequestException(error.message)
        
      }
      throw new HttpException("server internal error",500)
    }

  
  }

  async login(loginUserDto: LoginUserDto, res: Response) {
    try {
      const user = await this.userService.findOne(loginUserDto.email)
  
      const passwordIsCorrect = await dehashPassword(user.hashedPassword, loginUserDto.password);
  
      // ✅ Fixed: correct exception instantiation
      if (!passwordIsCorrect) {
        throw new UnauthorizedException('Invalid credentials');
      }
  
      const { accessToken, refreshToken } = this.jwtServcie.createToken(loginUserDto.email,user.role);
  
      user.refreshToken = refreshToken;
      await this.authRepository.save(user);
  
      setAuthCookie(res, accessToken, 'accessToken', 'accessToken');
      setAuthCookie(res, refreshToken, 'refreshToken', 'refreshToken');

      const { hashedPassword, refreshToken: _,role, ...safeUser } = user;
      return { message: "user logged in successfully", data: safeUser };
    } catch (error){
      if (error instanceof QueryFailedError) {
        const detail = error .driverError?.detail;

        throw new BadRequestException(detail)

      }
      if (error instanceof ZodError ) {
        throw new BadRequestException(error.message)
        
      }
      throw new HttpException("server internal error",500)
    }
  }

  async logout(token: tokenType, res: Response): Promise<any> {
    const { email } = token;
    const user = await this.userService.findOne(email);
  
    // Clear cookies (always do this)
    const cookieOptions = { httpOnly: true, secure: true, sameSite: 'strict' as const };
    res.clearCookie('accessToken', cookieOptions);
    res.clearCookie('refreshToken', cookieOptions);
  
    // Invalidate refresh token in DB
    if (user?.refreshToken) {
      user.refreshToken = undefined;
      await this.authRepository.save(user);
    }
  
    // ✅ MUST send response manually when using @Res()
    return res.status(200).json({
      message: user ? 'User logged out successfully' : 'Already logged out'
    });
  }
  async changeRole(email:string,role:UserRole,res: Response){
 const user= await this.userService.findOne(email)
  
 const updatedRole=   await  this.authRepository.update({email},{role:role})
 const cookieOptions = { httpOnly: true, secure: true, sameSite: 'strict' as const };
 const { accessToken, refreshToken } = this.jwtServcie.createToken(user.email,role);
  
 user.refreshToken = refreshToken;
 await this.authRepository.save(user);

 setAuthCookie(res, accessToken, 'accessToken', 'accessToken');
 setAuthCookie(res, refreshToken, 'refreshToken', 'refreshToken');
 if (!updatedRole.affected) {
  throw new NotFoundException(`User with email ${email} not found`);
}
 return updatedRole.raw
  }
}
