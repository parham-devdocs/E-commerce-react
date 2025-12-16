// cart/entities/cart.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, Column, OneToOne } from 'typeorm';
import { AUTH } from '../../auth/entities/user.entity';
import { CartItem } from './cart-item.entity';
import { Invoice } from 'src/payment/entities/payment.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;


  @ManyToOne(() => AUTH, user => user.carts)
  @JoinColumn({ name: 'userId' }) 
  user: AUTH;

  @OneToOne(() => Invoice, Invoice => Invoice.id) 
  @JoinColumn({ name: 'invoiceId' })
  invoice:Invoice
 
  @Column({default:false})
  active:boolean
  
  @OneToMany(() => CartItem, cartItem => cartItem.cart,{cascade:true})
  cartItems: CartItem[];
}