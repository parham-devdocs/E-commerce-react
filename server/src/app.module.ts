import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CatgoryModule } from './category/category.module';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [ ProductsModule,ConfigModule.forRoot({isGlobal:true}), AuthModule, CatgoryModule, ReviewModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
