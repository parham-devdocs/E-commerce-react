import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-auth.dto';
import { LoginUserDto } from './dto/login-auth.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JWTService } from './JWTService';
import { dehashPassword, setAuthCookie } from 'src/utils';
import {type Response } from 'express';
import { hashPassword } from "../utils";
import { QueryFailedError } from "typeorm";
import { ZodError } from 'zod';
import { tokenType } from 'src/interfaces';
import Token from 'src/customDecorators/token.decorator';
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

  async logout(token: tokenType, res: Response) {
    try {
      const user = await this.authRepository.findOne({ where: { email: token.email } });
  
      // Case 1: User doesn't exist
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      // Case 2: User exists but has no active session
      if (!user.refreshToken) {
        throw new UnauthorizedException('User not logged in');
      }
  
      // Case 3: Valid logout
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      user.refreshToken = '';
      await this.authRepository.save(user); // ✅ Await!
  
      return res.status(200).json({ message: 'User logged out' });
  
    } catch (error) {
      console.log(error)
      if (error instanceof NotFoundException) {
        return res.status(404).json({
          statusCode: 404,
          message: 'User not found',
          error: 'Not Found',
        });
      }
  
      if (error instanceof UnauthorizedException) {
        return res.status(401).json({
          statusCode: 401, // ✅ Fixed
          message: 'User not logged in',
          error: 'Unauthorized',
        });
      }
  
      // Unexpected error
      return res.status(500).json({
        statusCode: 500,
        message: 'Logout failed',
        error: 'Internal Server Error',
      });
    }
  }
}
