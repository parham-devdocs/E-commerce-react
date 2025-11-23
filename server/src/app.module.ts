import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database.module';
import { catsProviders } from './cats.provider';
import { ProductsModule } from './products/products.module';
@Module({
  imports: [DatabaseModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService, ...catsProviders],
})
export class AppModule {}
