import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from "./entities/review.entity";
import { ProductsService } from 'src/products/products.service';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { tokenType } from 'src/interfaces';
import { Repository } from 'typeorm';
@Injectable()
export class ReviewService {
  constructor(   
    @Inject('REVIEW_REPOSITORY') private reviewRepository: Repository<Review>,
        private userService: UserService,      
     private productsService: ProductsService 
    ){}
// review.service.ts
async create(
  productId: string,     
  token: tokenType,
  createReviewDto: CreateReviewDto
) {
  const { email } = token;
await this.productsService.findOne(productId)
const existingComment=await this.findOneByProductId(token,productId)
if (existingComment) {
  throw new ConflictException("comment for this product has already been made")
}
  const user = await this.userService.findOneByEmail(email);


  const review = this.reviewRepository.create({
    productId: productId,   // number
    comment: createReviewDto.comment,
    rate: createReviewDto.rate,
    user: user
  });

  const response = await this.reviewRepository.save(review);

  return {
    comment: response.comment,
    rate: response.rate,
    productId: response.productId,
    user: response.user.email, // or just email
  };
}

  findAll() {

  }

  async findOneByProductId(token:tokenType,productId: string) {
    const {email}=token
    const existingComment = await this.reviewRepository.findOne({
      where: {
        user: { email },     
        productId: productId,
      },
    });
  
   
    return existingComment
    }

    async remove(token: tokenType, productId: string) {
      const { email } = token;
    
      const result = await this.reviewRepository.findOne({
      where:{  user: {email},
        productId: productId,
      }});

    
      if (!result) {
        throw new NotFoundException('Review not found');
      }
   const r= await this.reviewRepository.remove(result)
   this.reviewRepository.save(r)
      return {
        message: 'Review deleted successfully',
      
      };
    }
}
