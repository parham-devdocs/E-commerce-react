
import { AUTH } from 'src/auth/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column,ObjectId, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: string;

  

  @Column()
  quantity: number;

  @ManyToOne(() => AUTH, auth => auth.cartItems) 
  @JoinColumn({ name: 'userId' }) 
  user: AUTH;

}


