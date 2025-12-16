import { Inject, Injectable } from '@nestjs/common';
import { createInvoiceDTO } from './dto/create-payment.dto';
import { UpdateInvoiceDto } from './dto/update-payment.dto';
import { Model } from 'mongoose';
import { Invoice } from './entities/payment.entity';
import { tokenType } from 'src/interfaces';
import { UserService } from 'src/user/user.service';
import { CartService } from 'src/cart/cart.service';
import { calculateDicount, calculatePriceWithDiscount } from 'src/utils';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class PaymentService {
  constructor(
    @Inject("PAYMENT_REPOSITORY")  private invoiceModel:Model<Invoice>,
    private userService: UserService,
    private cartService: CartService,
    private productService:ProductsService){}
async  create(token:tokenType,createInvoiceDTO: createInvoiceDTO) {
const {email}=token
const user=await this.userService.findOne(email)
const cart=await this.cartService.findActiveCart(token)


const products = await Promise.all(
  cart.cartItems.map(async (item) => {
    return (await this.productService.findOne(item.productId)).data
  })
);
console.log(products)
// const priceWithDiscount=calculatePriceWithDiscount(createInvoiceDTO.discount,createInvoiceDTO.price)
// const discount=calculateDicount(createInvoiceDTO.discount,creat)
// const createdInvoice=await this.invoiceModel.create({user,cart,discount:createInvoiceDTO.discount,priceWithDiscount:})



    return 'This action adds a new payment';
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
