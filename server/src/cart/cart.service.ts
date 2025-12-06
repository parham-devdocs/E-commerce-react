import { ConflictException, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartItemDTO } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Repository } from 'typeorm';
import {  CartItem} from "./entities/cart-item.entity";
import { JWTService } from 'src/auth/JWTService';
import { ProductsService } from 'src/products/products.service';
import { UserService } from 'src/user/user.service';
import { tokenType } from 'src/interfaces';
import { Product } from 'src/products/product.interface';
import { ProductItem } from './cart.intrface';
import { NotFoundError } from 'rxjs';
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
    const {data}=await this.productService.findOne(productId)
    if (data.count===0) {
      throw new HttpException("out of stock",422)
    }
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

  async findAll(token:tokenType) {

    const user=await this.userService.findOne(token.email)
    const cart:ProductItem[]=[]

     const existingCartItem=await this.cartRepository.find({where:{user}})
     
     if (existingCartItem.length===0) {
       return null
     }

      for (const item of existingCartItem) {
        const cartItem=await this.cartRepository.findOne({where:{user}})
if (!cartItem) {
  throw new NotFoundException("cart item not found")
}
        const {data} = await this.productService.findOne(String(item.productId))
        const modifiedProduct={id:data.id,price:data.price,discountPercentage:data.discountPercentage,name:data.name,quantity:cartItem.quantity }
cart.push(modifiedProduct)
        
    }
    return cart
 
 
   }

  async findOne(token:tokenType,productId:string) {
    const user=await this.userService.findOne(token.email)
   this.productService.findOne(productId)
    const existingCartItem=await this.cartRepository.find({where:{user,productId}})
    if (existingCartItem.length===0) {
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
