import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database.module';
import { reviewProvider } from './review.provider';
import { ProductsModule } from 'src/products/products.module';
import { UserModule } from 'src/user/user.module';
import { AccessContorlService } from 'src/accessControlService';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService,AccessContorlService,...reviewProvider],
  imports:[DatabaseModule,ProductsModule,UserModule,AuthModule]
})
export class ReviewModule {}
