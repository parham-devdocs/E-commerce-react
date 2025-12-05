import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database.module';
import { reviewProvider } from './review.provider';
import { ProductsModule } from 'src/products/products.module';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService,...reviewProvider],
  imports:[DatabaseModule,ProductsModule,UserModule]
})
export class ReviewModule {}
