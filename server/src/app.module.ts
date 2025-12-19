import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CatgoryModule } from './category/category.module';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentModule } from './payment/payment.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { JWTService } from './auth/JWTService';
import { AccessContorlService } from './accessControlService';
@Module({
  imports: [ ProductsModule,ConfigModule.forRoot({isGlobal:true}), AuthModule,  ReviewModule, UserModule, CartModule,  ConfigModule.forRoot({ isGlobal: true }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGOOSE_CONNECTION_URI')
      }),
    }),

    ProductsModule,
    CatgoryModule,
    PaymentModule
  ],
  controllers: [AppController],
  providers: [AppService,AccessContorlService],
exports:[AccessContorlService]
})
export class AppModule {}
