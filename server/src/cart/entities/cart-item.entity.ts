
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cart } from './cart.entity';
import { Exclude } from "class-transformer";
@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: string;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Cart, cart => cart.cartItems)
  @JoinColumn({ name: 'cartId' }) 
  @Exclude() 
  cart: Cart;
}


