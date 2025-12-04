import { Module } from '@nestjs/common';
import { CatgoryService } from './category.service';
import { CatgoryController } from './category.controller';
import { DatabaseModule } from 'src/database.module';
import { databaseProviders } from 'src/database.providers';
import { CategoryProvider } from './category.module.db';
import { ProductProvider } from 'src/products/product.db.module';

@Module({
  controllers: [CatgoryController],
  providers: [CatgoryService, ...CategoryProvider],
  imports: [DatabaseModule],
  exports:[...CategoryProvider]
})
export class CatgoryModule {}
