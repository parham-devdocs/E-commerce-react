
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  comment: string;
   
  @Column()
  productId:number;

   
  @Column({ type: 'int' }) 
  rate: number; 

  @ManyToOne(() => User, user => user.reviews) 
  @JoinColumn({ name: 'userId' }) 
  user: User;
}