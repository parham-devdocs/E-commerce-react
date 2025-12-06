import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemDTO } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import Token from 'src/customDecorators/token.decorator';
import {type tokenType } from 'src/interfaces';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post(":productId")
  create(@Token() token:tokenType, @Body() createCartDto: CreateCartItemDTO , @Param("productId") productId:string ) {
   
    return this.cartService.create(token,createCartDto,productId);
  }

  @Get()
  findAll(@Token() token:tokenType) {
    return this.cartService.findAll(token);
  }

  @Get(":productId")
  findOne(@Token() token:tokenType, @Body() createCartDto: CreateCartItemDTO , @Param("productId") productId:string) {
    return this.cartService.findOne(token,productId)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
