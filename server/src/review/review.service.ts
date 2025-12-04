import { Inject, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from "./entities/review.entity";
import { AuthService } from 'src/auth/auth.service';
import { ProductsService } from 'src/products/products.service';
import { Model } from 'mongoose';
@Injectable()
export class ReviewService {
  constructor(   
     @Inject("REVIEW_REPOSITORY") ReviewModel:Model<Review>,
     private authService: AuthService,      
     private productsService: ProductsService 
    ){ 

   }
  create(createReviewDto: CreateReviewDto) {
    
    return 'This action adds a new review';
  }

  findAll() {
    return `This action returns all review`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
