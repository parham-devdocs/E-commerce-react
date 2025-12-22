import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-auth.dto';
import { LoginUserDto } from './dto/login-auth.dto';
import { Repository } from 'typeorm';
import { AUTH, UserRole } from './entities/user.entity';
import { JWTService } from './JWTService';
import { dehashPassword, getAuthCookie, setAuthCookie } from 'src/utils';
import {Request, type Response } from 'express';
import { hashPassword } from "../utils";
import { QueryFailedError } from "typeorm";
import { ZodError } from 'zod';
import { CooikeType, tokenType } from 'src/interfaces';
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
      // 🔴 CRITICAL: Check if user already exists
      const existingUser = await this.authRepository.findOne({where:{email:registerUserDto.email}})
      console.log(existingUser)
      if (existingUser) {
        throw new BadRequestException('User with this email already exists');
      }
  
      const { accessToken, refreshToken } = this.jwtServcie.createToken(
        registerUserDto.email,
        registerUserDto.role, // now safe to use — user is new
      );
  
      setAuthCookie(res, accessToken, 'accessToken', 'accessToken');
      setAuthCookie(res, refreshToken, 'refreshToken', 'refreshToken');
  
      const hashedPassword = await hashPassword(registerUserDto.password);
  
      const newUser = this.authRepository.create({
        fullName: registerUserDto.fullName,
        email: registerUserDto.email,
        address: registerUserDto.address,
        phoneNumber: registerUserDto.phoneNumber,
        hashedPassword,
        refreshToken,
      });
  
      const user = await this.authRepository.save(newUser);
      return { user, message: "User registered successfully" };
  
    } catch (error) {
      // Optional: improve QueryFailedError handling
      if (error instanceof QueryFailedError) {
        // Log the actual error for debugging
        console.error('Database error:', error);
  
        // Provide a safe fallback message
        const detail = error.driverError?.detail || 'Email or phone number already in use';
        throw new BadRequestException(detail);
      }
  
      if (error instanceof BadRequestException) {
        throw error; // re-throw known client errors
      }
  
      // Avoid generic 500 — but keep it as fallback
      console.error('Unexpected error in register:', error);
      throw new HttpException('Registration failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(loginUserDto: LoginUserDto, res: Response) {
    try {
      const user = await this.userService.findOneByEmail(loginUserDto.email)
  
      const passwordIsCorrect = await dehashPassword(user.hashedPassword, loginUserDto.password);
  
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


// In AuthService
async refreshToken(req: Request, res: Response) {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    throw new UnauthorizedException('Refresh token missing');
  }

  try {
    const payload = this.jwtServcie.verifyTokenOnly("refreshToken",refreshToken); 
    const { email } = payload;
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

 
    const { accessToken, refreshToken: newRefreshToken } = this.jwtServcie.createToken(email, user.role);

    user.refreshToken = newRefreshToken;
    await this.authRepository.save(user);

    setAuthCookie(res,"accessToken", accessToken, 'accessToken');
    setAuthCookie(res,"refreshToken", newRefreshToken, 'refreshToken');

    const { hashedPassword, refreshToken: _, ...safeUser } = user;
    const tokens=getAuthCookie(req)
    return {
      message: 'Tokens refreshed successfully',
      user: safeUser,
      accessToken,refreshToken
    };

  } catch (error) {
    // Clear cookies on failure
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    
    if (error.name === 'TokenExpiredError') {
      throw new UnauthorizedException('Refresh token expired');
    }
    if (error.name === 'JsonWebTokenError') {
      throw new UnauthorizedException('Invalid refresh token');
    }
    throw new UnauthorizedException('Unable to refresh token');
  }
}


  async logout(token: tokenType, res: Response): Promise<any> {
    const { email } = token;
    const user = await this.userService.findOneByEmail(email);
  
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
 const user= await this.userService.findOneByEmail(email)
  
 const updatedRole=   await  this.authRepository.update({email},{role:role})
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
