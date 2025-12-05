
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AUTH} from 'src/auth/entities/user.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  comment: string;
   
  @Column()
  productId:string;

   
  @Column({ type: 'int' }) 
  rate: number; 

  @ManyToOne(() => AUTH, auth => auth.reviews) 
  @JoinColumn({ name: 'userId' }) 
  user: AUTH;
}