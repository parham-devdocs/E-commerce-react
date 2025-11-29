import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  fullName: string;

  @Column({type:"text",unique:true})
  email: string;

  @Column({type:"text",unique:true})
  phoneNumber: string;

  @Column({nullable:true})
  cartId?: number;

  @Column()
  address: string;

  @Column()
  hashedPassword: string;

  @Column({type:"text"})
  refreshToken?:string

  
}
