// cart/entities/cart.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, Column } from 'typeorm';
import { AUTH } from '../../auth/entities/user.entity';
import { CartItem } from './cart-item.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;


  @ManyToOne(() => AUTH, user => user.carts)
  @JoinColumn({ name: 'userId' }) 
  user: AUTH;
 
  @Column({default:false})
  active:boolean
  
  @OneToMany(() => CartItem, cartItem => cartItem.cart,{cascade:true})
  cartItems: CartItem[];
}