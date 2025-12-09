import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import {ProductProvider  } from "./product.db.module";
import { DatabaseModule } from 'src/database.module';
import { CatgoryModule } from "src/category/category.module";
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/category/category.schema';
import { ProductSchema,Product } from './product.schema';
@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports:[CatgoryModule, MongooseModule.forFeature([
    { name: Product.name, schema: ProductSchema },
    { name: Category.name, schema: CategorySchema }
  ]),],
  exports:[ProductsService]
})

export class ProductsModule {}
