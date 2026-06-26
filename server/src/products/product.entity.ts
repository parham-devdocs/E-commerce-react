import { Entity, PrimaryGeneratedColumn, OneToMany, Column, ManyToOne, JoinColumn } from 'typeorm';
import { AttributeValue } from './attribute-value.entity';
import { Category } from 'src/category/entities/category.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryId: number;

  @Column({ type: 'varchar', length: 255 })
  name: string; // ✅ FIXED: should be string, not boolean

  @Column({ type: 'text', nullable: true })
  description: string; // ✅ FIXED: should be string, not boolean

  @Column({ type: 'int', default: 0 })
  count: number;

  @Column({ type: 'boolean', default: true })
  inStock: boolean; // ✅ FIXED: better naming

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  discountPercentage: number;

 
  @Column({ nullable: true })
  brandId: number; // ✅ FIXED: better naming

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; // ✅ ADDED

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date; // ✅ ADDED

  // One Product has many AttributeValues
  @OneToMany(() => AttributeValue, (attributeValue) => attributeValue.product, {
    cascade: true, 
  })
  attributeValues: AttributeValue[];

  @ManyToOne(() => Category, (category) =>category.products , {
    onDelete: 'CASCADE', 
  })
  @JoinColumn({ name: 'categoryId' })
  category:Category;
}
