// src/payment/entities/invoice.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, Column } from 'typeorm';
import { AUTH } from 'src/auth/entities/user.entity';
import { Cart } from 'src/cart/entities/cart.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AUTH, user => user.invoices)
  @JoinColumn({ name: 'userId' })
  user: AUTH;

  @OneToOne(() => Cart, cart => cart.invoice) 
  @JoinColumn({ name: 'cartId' }) 
  cart: Cart;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  discount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  priceWithDiscount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}