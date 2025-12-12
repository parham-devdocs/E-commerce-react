import { ConflictException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
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
import { NotFoundError, retry } from 'rxjs';
import { Cart } from './entities/cart.entity';
import mongoose from 'mongoose';
@Injectable()
export class CartService {
  constructor(
    @Inject('CART_REPOSITORY')     private cartRepository: Repository<Cart>,
    @Inject('CART_ITEM_REPOSITORY')     private cartItemRepository: Repository<CartItem>,
    private productService:ProductsService,
    private userService:UserService
  ){}
  async create(
    token: tokenType,
    createCartItemDto: CreateCartItemDTO,
  ) {
    const user = await this.userService.findOne(token.email);
 const {inCart}=await this.findProductInCart(token,createCartItemDto.productId)
 if (inCart) {
  const cartItem=await this.cartItemRepository.findOne({where:{productId:createCartItemDto.productId}})
  if (cartItem) {
    cartItem.quantity=createCartItemDto.quantity
await  this.cartItemRepository.save(cartItem)    
  const {item}=await this.findProductInCart(token,createCartItemDto.productId)

return item
  }
 }
     await this.productService.findOne(createCartItemDto.productId);
  
    let cart =await this.findActiveCart(token,createCartItemDto.productId)
  
    const cartItem = this.cartItemRepository.create({
      productId:createCartItemDto.productId,
      quantity: createCartItemDto.quantity,
    });
    if (cart) {
      cartItem.cart = cart;
      cart.cartItems.push(cartItem)
    } else {
      cart = this.cartRepository.create({
        user: user,
        active: true,
        cartItems: [cartItem]
      });
      cartItem.cart = cart
    }
  
    const savedCart = await this.cartRepository.save(cart);
  
    return {
      id: savedCart.id,
      active: savedCart.active,
      cartItems: savedCart.cartItems.map((item) => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
      })),
    };
  }


  async findActiveCart(token:tokenType,productId:string) {
    const user=await this.userService.findOne(token.email)
   this.productService.findOne(productId)
  const active=await this.cartRepository.findOne({where:{active:true,user},relations:["cartItems"]})
  
return active

  }

  async findProductInCart(token: tokenType, productId: string) {
    const user = await this.userService.findOne(token.email);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  
    // This single query is blazing fast
    const cartItem = await this.cartItemRepository.findOne({
      where: {
        cart: {
          user: { id: user.id },
          active: true,
        },
        productId 
      },
    });
  
    if (cartItem) {
      
      return {
        inCart: true,
        message: 'Product already in cart',
        item: cartItem,
        quantity: cartItem.quantity,
      };
    }
  
    return {
      inCart: false,
      message: 'Product can be added',
    };
  }
  

  async findProductsInCart(token: tokenType) {
    const user = await this.userService.findOne(token.email);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  
    const cart = await this.cartRepository.findOne({
      where: {
        user,
        active: true,
      },
      relations: ["cartItems"],
    })
    if (cart) {
      const products: any[] = [];
      for (const cartItem of cart.cartItems) {
        const product = await this.productService.findOne(cartItem.productId)
        const modifiedProduct={price:product.data.price,name:product.data.name,discountPercentage:product.data.discountPercentage,id:product.data.id,image:product.data.images[0],quantity:cartItem.quantity}
        products.push(modifiedProduct)
      }
    
      return {
        inCart: true,
        message: 'Product already in cart',
        products,
      };
    }
    
    return {
      inCart: false,
      message: 'Product can be added',
    }}




  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
