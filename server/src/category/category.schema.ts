import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category  {
@Prop({required:true})
name: string;

@Prop({required:false,ref:"Product"})
products: [Types.ObjectId];

@Prop()
password: string;

_id: Types.ObjectId
}

export const CategorySchema = SchemaFactory.createForClass(Category);