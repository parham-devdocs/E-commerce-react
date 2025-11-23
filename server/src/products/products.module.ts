import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import {ProductProvider  } from "./product.module";
import { DatabaseModule } from 'src/database.module';
@Module({
  controllers: [ProductsController],
  providers: [ProductsService,...ProductProvider],
  imports:[DatabaseModule]
})
export class ProductsModule {}
