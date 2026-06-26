// cart/entities/cart.entity.ts
import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { AttributeValue } from './attribute-value.entity';

@Entity()
export class Attribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string; // ✅ FIXED: should be string, not boolean

  @Column({ unique: true })
  code: string; // ✅ ADDED: unique identifier like 'color', 'size'

  @Column({ type: 'text', nullable: true })
  description: string; // ✅ ADDED

  @OneToMany(() => AttributeValue, (attributeValue) => attributeValue.attribute)
  attributeValues: AttributeValue[];
}
