import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, ProductsModule,ConfigModule.forRoot({isGlobal:true}), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
