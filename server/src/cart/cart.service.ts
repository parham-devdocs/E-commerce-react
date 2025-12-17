import { ConflictException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartItemDTO } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Repository } from 'typeorm';
import {  CartItem} from "./entities/cart-item.entity";
import { JWTService } from 'src/auth/JWTService';
import { ProductsService } from 'src/products/products.service';
import { UserService } from 'src/user/user.service';
import { tokenType } from 'src/interfaces';
import { Cart } from './entities/cart.entity';
@Injectable()
export class CartService {
  constructor(
    @Inject('CART_REPOSITORY')     private cartRepository: Repository<Cart>,
    @Inject('CART_ITEM_REPOSITORY')     private cartItemRepository: Repository<CartItem>,
    private productService:ProductsService,
    private userService:UserService
  ){}
  async upsert(
    token: tokenType,
    createCartItemDto: CreateCartItemDTO,
  ) {
    console.log('[DEBUG] Starting upsert for user:', token.email, 'productId:', createCartItemDto.productId);
  
    const user = await this.userService.findOne(token.email);
    console.log('[DEBUG] Found user:', user?.id);
  
    // ✅ Get the actual cart item in the user's active cart
    const cartItemResult = await this.findProductInCart(token, createCartItemDto.productId);
    console.log('[DEBUG] Product in cart?', cartItemResult.inCart);
  
    if (cartItemResult.inCart && cartItemResult.item) {
      // ✅ Use the already-found cart item — it's guaranteed to be in the correct cart
      const cartItem = cartItemResult.item;
      console.log('[DEBUG] Updating existing cartItem:', cartItem.id, 'from', cartItem.quantity, 'to', createCartItemDto.quantity);
  
      cartItem.quantity = createCartItemDto.quantity;
      await this.cartItemRepository.save(cartItem);
      console.log('[DEBUG] cartItem updated successfully.');
  
      // Optionally reload to ensure relations are fresh (or just return updated data)
      return {
        id: cartItem.id,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
      };
    }
  
    // --- If not in cart: create new cart item ---
    console.log('[DEBUG] Product NOT in cart. Creating new cartItem...');
  
    await this.productService.findOne(createCartItemDto.productId);
    console.log('[DEBUG] Product exists.');
  
    let cart = await this.findActiveCart(token);
    console.log('[DEBUG] Active cart found?', !!cart, cart ? `Cart ID: ${cart.id}` : 'No active cart.');
  
    const cartItem = this.cartItemRepository.create({
      productId: createCartItemDto.productId,
      quantity: createCartItemDto.quantity,
    });
  
    if (cart) {
      cartItem.cart = cart;
      cart.cartItems.push(cartItem);
    } else {
      cart = this.cartRepository.create({
        user: user,
        active: true,
        cartItems: [cartItem],
      });
      cartItem.cart = cart;
    }
  
    const savedCart = await this.cartRepository.save(cart);
    console.log('[DEBUG] Cart saved. Total items:', savedCart.cartItems.length);
  
    // Return the newly added item
    const newItem = savedCart.cartItems.find(item => item.productId === createCartItemDto.productId);
    return {
      id: newItem?.id,
      productId: newItem?.productId,
      quantity: newItem?.quantity,
    };
  }

  async findActiveCart(token:tokenType) {
    const user=await this.userService.findOne(token.email)
  const active=await this.cartRepository.findOne({where:{active:true,user},relations:["cartItems"]})
  if (!active) {
    return null
  }
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
  console.log(cartItem)
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




    async removeCartItem(token: tokenType, productId: string) {
      const cartItem = await this.findProductInCart(token, productId);
    
      if (!cartItem.item) {
        throw new NotFoundException('Product not found in cart');
      }
    
      await this.cartItemRepository.remove(cartItem.item);
    
      return {
        success: true,
        message: 'Item removed from cart',
        removedItem: {
          productId: cartItem.item.id,
          quantity: cartItem.quantity,
        },
      };
    }

    async deactiveCart(token:tokenType){
const cart=await this.findActiveCart(token)
if (cart) {
  cart.active=false
const deactivatedCart=await this.cartRepository.save(cart)
return deactivatedCart


}
throw new NotFoundException("cart not found")
}}
