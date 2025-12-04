import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import {ProductProvider  } from "./product.db.module";
import { DatabaseModule } from 'src/database.module';
import { CatgoryModule } from "src/category/category.module";
@Module({
  controllers: [ProductsController],
  providers: [ProductsService,...ProductProvider],
  imports:[DatabaseModule,CatgoryModule],
  exports:[ProductsService]
})

export class ProductsModule {}
