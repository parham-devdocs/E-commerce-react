import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { cartProvider,cartItemProvider } from './cart.provider';
import { DatabaseModule } from 'src/database.module';
import { ProductsModule } from 'src/products/products.module';
import { UserModule } from 'src/user/user.module';
import { AuthGuard } from 'src/auth.guard';
import { userProvider } from 'src/user/user.provider';
import { UserService } from 'src/user/user.service';
import { AuthModule } from 'src/auth/auth.module';
import { AccessContorlService } from 'src/accessControlService';

@Module({
  controllers: [CartController],
  providers: [CartService,...cartProvider,...cartItemProvider,AccessContorlService],
  imports:[DatabaseModule,ProductsModule,UserModule,AuthModule],
  exports:[CartService]
})
export class CartModule {}

