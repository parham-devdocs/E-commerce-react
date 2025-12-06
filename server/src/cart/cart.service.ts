import { ConflictException, HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateCartItemDTO } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Repository } from 'typeorm';
import {  CartItem} from "./entities/cart-item.entity";
import { JWTService } from 'src/auth/JWTService';
import { ProductsService } from 'src/products/products.service';
import { UserService } from 'src/user/user.service';
import { tokenType } from 'src/interfaces';
@Injectable()
export class CartService {
  constructor(
    @Inject('CART_REPOSITORY')
    private cartRepository: Repository<CartItem>,
    private productService:ProductsService,
    private userService:UserService
  ){}
  async create(token:tokenType,createCartItemDto: CreateCartItemDTO,productId:string) {
    const user=await this.userService.findOne(token.email)
    await this.productService.findOne(productId)
    const existingCartItem=await this.findOne(token,productId)
    if (existingCartItem) {
      throw new ConflictException("this product has been regidterd for this user")
    }
    try {
      const cartItem=new CartItem()
      cartItem.productId=productId
      cartItem.user=user
      cartItem.quantity=createCartItemDto.quantity
      await this.cartRepository.save(cartItem)
      return cartItem
    } catch (error) {
      throw new HttpException("Internal Server Error",400)
    }
  }

  findAll(token:tokenType,createCartItemDto: CreateCartItemDTO,productId:string) {
     return ""
  }

  async findOne(token:tokenType,productId:string) {
    const user=await this.userService.findOne(token.email)
   this.productService.findOne(productId)
    const existingCartItem=await this.cartRepository.find({where:{user,productId}})
    if (!existingCartItem) {
      return null
    }
    return existingCartItem




  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
