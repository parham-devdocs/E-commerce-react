
  import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
  import { HydratedDocument, Types } from 'mongoose';
  
  export type ProductDocument = HydratedDocument<Product>;
  
  @Schema({timestamps:true})
  export class Product {
   
    @Prop({ required: true })
    name: string;
  
    @Prop({ required: true }) 
    brand: string;
  
    @Prop({ type: Types.ObjectId, ref: 'Category', required: true }) 
    category: Types.ObjectId;
  
    @Prop({ required: true, type: Number }) 
    price: number;
  
    @Prop({ min: 0, max: 100, default: 0 })
    discountPercentage: number;

    @Prop({type:Number})
    discountAmount: number;

  
    @Prop({type:Number})
    priceWithDiscount: number;
    


    @Prop({ default: true })
    inStock: boolean;
  
    @Prop({ min: 0, default: 0 })
    count: number;
  
    @Prop([{ type: String, required: true }])
    images: string[];
  
    @Prop({ type: String, maxlength: 1000 })
    description: string;
  
    @Prop({type:{}})
    attributes: Record<string, any>;

    @Prop({type:Date})
    createdAt?: Date

    @Prop({type:Date})
    updatedAt?: Date

  }
  
  export const ProductSchema = SchemaFactory.createForClass(Product);