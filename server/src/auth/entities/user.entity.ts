// auth/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { Review } from 'src/review/entities/review.entity';
import { Invoice } from 'src/payment/entities/payment.entity';


// roles.enum.ts
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest', // optional, usually inferred at runtime
}
@Entity('auth') 
export class AUTH {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  fullName: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', unique: true })
  phoneNumber: string;

  @Column()
  address: string;

  @Column()
  hashedPassword: string;
  
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ type: 'text', nullable: true })
  refreshToken?: string;

  @OneToMany(() => Cart, cart => cart.user)
  carts: Cart[];

  @OneToMany(() => Invoice, Invoice => Invoice.user)
  invoices: [];

  @OneToMany(() => Review, review => review.user )
  review: Review[];
}