import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemDTO } from './dto/create-cart.dto';
import Token from 'src/customDecorators/token.decorator';
import {type tokenType } from 'src/interfaces';
import { AuthGuard } from "../auth.guard";
import { Roles } from 'src/roles.decorator';
import { UserRole } from 'src/auth/entities/user.entity';
import { RoleGuard } from 'src/role.guard';
@Controller('cart')
@UseGuards(AuthGuard, RoleGuard) 

export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Roles(UserRole.ADMIN) 
  @Post()
  create(@Token() token:tokenType, @Body() createCartDto: CreateCartItemDTO ) {
   
    return this.cartService.upsert(token,createCartDto);
  }

  @Roles(UserRole.USER)
  @Patch()
  deacticeCart(@Token() token:tokenType){
    return this.cartService.deactiveCart(token)
  }

  @Roles(UserRole.USER)
    @Get("products")
  findProductsInCart(@Token() token:tokenType) {
    return this.cartService.findProductsInCart(token)
  }

  @Roles(UserRole.USER)
  @Get()
  findActiveCart(@Token() token:tokenType ) {
    return this.cartService.findActiveCart(token)
  }


  @Roles(UserRole.USER)
  @Delete(':id')
  remove(@Token() token:tokenType,@Param('id') id: string) {
    return this.cartService.removeCartItem(token,id);
  }
  
}
