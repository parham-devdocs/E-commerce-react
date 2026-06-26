// cart/entities/cart.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Column,
  OneToOne,
  Index,
} from 'typeorm';
import { Product } from './product.entity';
import { Attribute } from './attribute.entity';

@Entity('attribute_values')
@Index(['productId', 'attributeId'], { unique: true }) // ✅ ADDED: prevent duplicate attributes per product
export class AttributeValue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  attributeId: number;

  // Value storage for different data types
  @Column({ type: 'text', nullable: true })
  valueText: string;

  @Column({ type: 'decimal', precision: 20, scale: 6, nullable: true })
  valueNumber: number;

  @Column({ type: 'boolean', nullable: true })
  valueBoolean: boolean;

  @Column({ type: 'timestamp', nullable: true })
  valueDate: Date;

  @Column({ type: 'json', nullable: true })
  valueJson: any;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; // ✅ ADDED: for auditing

  // Many AttributeValues belong to one Product
  @ManyToOne(() => Product, (product) => product.attributeValues, {
    onDelete: 'CASCADE', // ✅ ADDED: delete values when product is deleted
  })
  @JoinColumn({ name: 'productId' })
  product: Product;

  // Many AttributeValues belong to one Attribute
  @ManyToOne(() => Attribute, (attribute) => attribute.attributeValues, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'attributeId' })
  attribute: Attribute;
}
