import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { cartProvider,cartItemProvider } from './cart.provider';
import { DatabaseModule } from 'src/database.module';
import { ProductsModule } from 'src/products/products.module';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [CartController],
  providers: [CartService,...cartProvider,...cartItemProvider],
  imports:[DatabaseModule,ProductsModule,UserModule],
  exports:[CartService]
})
export class CartModule {}

