import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { paymentProvider } from './payment.provider';
import { DatabaseModule } from 'src/database.module';
import { UserService } from 'src/user/user.service';
import { CartService } from 'src/cart/cart.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { authProvider } from 'src/auth/auth.provider';
import { cartItemProvider, cartProvider } from 'src/cart/cart.provider';
import { CartModule } from 'src/cart/cart.module';
import { ProductsModule } from 'src/products/products.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    CartModule,       
    ProductsModule,
    UserModule,       
  ],
  controllers: [PaymentController],
  providers: [PaymentService, ...paymentProvider],
  exports: [PaymentService],
})
export class PaymentModule {}
