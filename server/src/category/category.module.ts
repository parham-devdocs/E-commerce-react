import { Module } from '@nestjs/common';
import { CatgoryService } from './category.service';
import { CatgoryController } from './category.controller';
import { DatabaseModule } from 'src/database.module';
import { databaseProviders } from 'src/database.providers';
// import { CategoryProvider } from './category.module.db';
import { ProductProvider } from 'src/products/product.db.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/products/product.schema';
import { CategorySchema } from './category.schema';
import { AccessContorlService } from 'src/accessControlService';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CatgoryController],
  providers: [CatgoryService,AccessContorlService],
  imports: [DatabaseModule,AuthModule,MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema },
    { name: 'Product', schema: ProductSchema } ])]
})
export class CatgoryModule {}
