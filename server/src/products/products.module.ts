import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductProvider } from './product.db.module';
import { DatabaseModule } from 'src/database.module';
import { CatgoryModule } from 'src/category/category.module';
import { MongooseModule } from '@nestjs/mongoose';
import {  Product } from './product.entity';
import { join } from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';
import { AccessControlService } from 'src/accessControlService';
import { Category } from 'src/category/entities/category.entity';
@Module({
  controllers: [ProductsController],
  providers: [ProductsService, AccessControlService],
  imports: [
    CatgoryModule,
    AuthModule,
    MongooseModule.forFeature([
      { name: Product.name, schema: Product },
      { name: Category.name, schema: Category },
    ]),
    MulterModule.register({
      dest: join(__dirname, '../../', 'uploads'),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
