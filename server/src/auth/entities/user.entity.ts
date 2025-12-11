// auth/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { Review } from 'src/review/entities/review.entity';

@Entity('auth') // or 'user'
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

  @Column({ type: 'text', nullable: true })
  refreshToken?: string;

  @OneToMany(() => Cart, cart => cart.user)
  carts: Cart[];

  @OneToMany(() => Review, review => review.user )
  review: Review[];
}