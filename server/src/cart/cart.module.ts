import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { cartProvider } from './cart.provider';
import { DatabaseModule } from 'src/database.module';
import { ProductsModule } from 'src/products/products.module';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [CartController],
  providers: [CartService,...cartProvider],
  imports:[DatabaseModule,ProductsModule,UserModule]
})
export class CartModule {}

