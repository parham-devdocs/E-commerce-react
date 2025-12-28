import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CatgoryModule } from './category/category.module';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentModule } from './payment/payment.module';
import { AccessContorlService } from './accessControlService';
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from 'path';
@Module({
  imports: [ ProductsModule,ConfigModule.forRoot({isGlobal:true}), ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..','..', 'client'),
    exclude: ['/api*', '/uploads*']
  }), 
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads'), // points to server/uploads/
    serveRoot: '/uploads/', // URL prefix
  }),
  AuthModule,  ReviewModule, UserModule, CartModule,  ConfigModule.forRoot({ isGlobal: true }),

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
