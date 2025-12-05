import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import Token from 'src/customDecorators/token.decorator';
import {type tokenType } from 'src/interfaces';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


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

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.userService.findOne(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
