import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

  // ... other imports
  
  async login(loginUserDto: LoginUserDto, res: Response) {
    const logger = new Logger('AuthService');
    
    logger.log('Login attempt started', { email: loginUserDto.email });
  
    try {
      // 🔍 Log: Incoming request data (avoid logging raw password!)
      logger.log('Received login DTO', { email: loginUserDto.email });
  
      // 🔍 Step 1: Find user by email
      const user = await this.userService.findOneByEmail(loginUserDto.email);
      
      if (!user) {
        logger.warn('User not found', { email: loginUserDto.email });
        throw new UnauthorizedException('Invalid credentials');
      }
  
      logger.log('User found', { userId: user.id, email: user.email });
  
      // 🔍 Step 2: Verify password
      logger.log('Verifying password...');
      const passwordIsCorrect = await dehashPassword(user.hashedPassword, loginUserDto.password);
  
      if (!passwordIsCorrect) {
        logger.warn('Password verification failed', { email: loginUserDto.email });
        throw new UnauthorizedException('Invalid credentials');
      }
  
      logger.log('Password verified successfully', { email: loginUserDto.email });
  
      const { accessToken, refreshToken } = this.jwtServcie.createToken(loginUserDto.email, user.role);
      logger.log('JWT tokens generated', { email: loginUserDto.email, role: user.role });
  
      user.refreshToken = refreshToken;
      await this.authRepository.save(user);
      logger.log('Refresh token saved to DB', { userId: user.id });
  
      setAuthCookie(res, accessToken, 'accessToken', 'accessToken');
      setAuthCookie(res, refreshToken, 'refreshToken', 'refreshToken');
      logger.log('Auth cookies set');
  
      const { hashedPassword, refreshToken: _, ...safeUser } = user;
      logger.log('Login successful', { userId: user.id });
  
      return { message: "user logged in successfully", data: safeUser };
  
     } catch (error) {
      logger.error('Login failed', {
        error: {
          message: error.message,
          name: error.constructor.name,
          stack: error.stack,
        },
        email: loginUserDto?.email,
      });
    
      // Re-throw client-facing errors so they keep their status code
      if (
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException ||
        error instanceof BadRequestException ||
        error instanceof HttpException
      ) {
        throw error; // Preserve original status code (404, 401, 400, etc.)
      }
    
      // Only treat truly unexpected errors as 500
      logger.error('Unexpected error during login', { error });
      throw new HttpException('Internal server error', 500);
    }
  }


  async refreshToken(refreshToken:string, res: Response) {
    console.log("refresh is called")
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }
    console.log('[RefreshToken] Starting refresh token process');
  
  
    if (!refreshToken) {
      console.warn('[RefreshToken] Refresh token missing in cookies');
      throw new UnauthorizedException('Refresh token missing');
    }
  
    try {
      console.log('[RefreshToken] Verifying refresh token...');
      const payload = this.jwtServcie.verifyTokenOnly('refreshToken', refreshToken); 
      const { email } = payload;
  
      console.log(`[RefreshToken] Token verified. Fetching user with email: ${email}`);
      const user = await this.userService.findOneByEmail(email);
      if (!user) {
        console.warn(`[RefreshToken] User not found for email: ${email}`);
        throw new UnauthorizedException('User not found');
      }
  
      console.log(`[RefreshToken] Generating new tokens for user: ${email}`);
      const { accessToken, refreshToken: newRefreshToken } = this.jwtServcie.createToken(email, user.role);
  
      // Update refresh token in DB
      user.refreshToken = newRefreshToken;
      await this.authRepository.save(user);
      console.log(`[RefreshToken] Refresh token updated in DB for user: ${email}`);
  
      // Set cookies
      setAuthCookie(res, accessToken, 'accessToken', 'accessToken');
      setAuthCookie(res, newRefreshToken, 'refreshToken', 'refreshToken'); // ← newRefreshToken!
      console.log('[RefreshToken] Auth cookies set successfully');
  
      // Omit sensitive fields
      const { hashedPassword, refreshToken: _, ...safeUser } = user;
  
      console.log('[RefreshToken] Refresh token flow completed successfully');
      return {
        message: 'Tokens refreshed successfully',
        user: safeUser,
        accessToken,
        refreshToken: newRefreshToken, // note: returning new one, not the old input
      };
  
    } catch (error) {
      console.error(`[RefreshToken] Error during refresh: ${error.message}`);
      console.error('[RefreshToken] Error stack:', error.stack);
  
      // Clear cookies on failure
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      console.log('[RefreshToken] Auth cookies cleared due to error');
  
      if (error.name === 'TokenExpiredError') {
        console.warn('[RefreshToken] Refresh token expired');
        throw new UnauthorizedException('Refresh token expired');
      }
      if (error.name === 'JsonWebTokenError') {
        console.warn('[RefreshToken] Invalid refresh token');
        throw new UnauthorizedException('Invalid refresh token');
      }
  
      console.error('[RefreshToken] Unexpected error – unable to refresh token');
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
  console.log(user)
 const updatedRole=   await  this.authRepository.update({email},{role})

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
