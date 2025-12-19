import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, BadRequestException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import Token from 'src/customDecorators/token.decorator';
import {type tokenType } from 'src/interfaces';
import { AuthGuard } from 'src/auth.guard';
import { RoleGuard } from 'src/role.guard';
import { Roles } from 'src/roles.decorator';
import { UserRole } from 'src/auth/entities/user.entity';

@UseGuards(AuthGuard, RoleGuard) 
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

@Roles(UserRole.ADMIN)
  @Get('list/:page')
  findAll(
    @Token() token: tokenType,
    @Param('page', ParseIntPipe) page: number
  ) {
    if (page < 1) {
      throw new BadRequestException('Page must be >= 1');
    }
    return this.userService.findAll(page);
  }

  @Roles(UserRole.ADMIN)
  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }

  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
