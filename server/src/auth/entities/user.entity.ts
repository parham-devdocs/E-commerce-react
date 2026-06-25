// auth/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { Review } from 'src/review/entities/review.entity';
import { Invoice } from 'src/payment/entities/payment.entity';


// roles.enum.ts
export enum UserRole {
  USER = 'user',
  GUEST = 'guest', 
  ADMIN = 'admin',

}
@Entity('auth') 
export class AUTH {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  fullName: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text', unique: true,nullable:true })
  phoneNumber: string;

  @Column({ type: 'text', unique: true,nullable:true })
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