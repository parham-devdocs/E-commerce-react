import { Review } from "src/review/entities/review.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UpdateUserDto {

  @Column({ length: 30 })
  fullName: string;

  @Column({type:"text",unique:true})
  email: string;

  @Column({type:"text",unique:true})
  phoneNumber: string;

  @Column()
  address: string;

}
