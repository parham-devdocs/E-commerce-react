import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemDTO } from './dto/create-cart.dto';
import Token from 'src/customDecorators/token.decorator';
import {type tokenType } from 'src/interfaces';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Token() token:tokenType, @Body() createCartDto: CreateCartItemDTO ) {
   
    return this.cartService.create(token,createCartDto);
  }
  @Get("products")
  findProductsInCart(@Token() token:tokenType) {
    return this.cartService.findProductsInCart(token)
  }
  @Get(":id")
  findActiveCart(@Token() token:tokenType, @Body() createCartDto: CreateCartItemDTO , @Param("id") id:string) {
    return this.cartService.findActiveCart(token,id)
  }

  @Delete(':id')
  remove(@Token() token:tokenType,@Param('id') id: string) {
    return this.cartService.remove(token,id);
  }
  
}
