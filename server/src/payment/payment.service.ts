import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UpdateInvoiceDto } from './dto/update-payment.dto';
import { Model } from 'mongoose';
import { Invoice } from './entities/payment.entity';
import { tokenType } from 'src/interfaces';
import { UserService } from 'src/user/user.service';
import { CartService } from 'src/cart/cart.service';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    @Inject("PAYMENT_REPOSITORY")  private invoiceModel:Repository<Invoice>,
    private userService: UserService,
    private cartService: CartService,
    private productService:ProductsService){}
async  create(token:tokenType) {
const {email}=token
const user=await this.userService.findOneByEmail(email)
const cart=await this.cartService.findActiveCart(token)
if (cart) {
  const productPromises = cart.cartItems.map(async (item) => {
    const response = (await this.productService.findOne(item.productId)).data;
    if (!response.inStock) {
      throw new ConflictException(`Product ${response.name} is out of stock`);
    }
    return {
      id: response.id,
      name: response.name,
      price: response.price,
      discountPercentage: response.discountPercentage,
      discountAmount: response.discountAmount || 0,
      priceWithDiscount: response.priceWithDiscount || response.price,
      quantity: item.quantity,
    };
  });
  
  const products = await Promise.all(productPromises);
  const price = products.reduce((acc, product) => {
 return acc + (product?.price * product?.quantity)
  }, 0)
  
  const finalPrice=products.reduce((acc,product)=>{
    return acc + (product?.priceWithDiscount * product?.quantity);


  
  },0)
  
  const totalDiscount=products.reduce((acc,product)=>{
   return acc + (product.discountAmount * product.quantity)
   
  },0)
  
      const newInvoice= this.invoiceModel.create({user,cart,totalDiscount,price,finalPrice})
  await this.cartService.deactiveCart(token)
      const savedInvoice= this.invoiceModel.save(newInvoice)
console.log("something")
      products.map(product=>{
      this.productService.reduceStock(product.id,product.quantity)
      })
      return  savedInvoice
}
throw new ConflictException("the invoice has already been craeted for this cart")
  }

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdateInvoiceDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
