import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { type tokenType } from 'src/interfaces';
import Token from 'src/customDecorators/token.decorator';

@Controller('review')
export class ReviewController {

  constructor(private readonly reviewService: ReviewService) {  }

  @Post(':productId')
  create(
    @Token() token: tokenType,
    @Param('productId') productId: string, 
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return this.reviewService.create(productId, token, createReviewDto);
  }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':productId')
  findOne( 
  @Token() token: tokenType,
  @Param('productId') productId: string,


) {
  
    return this.reviewService.findOneByProductId(token,productId);
  }


  @Delete(':productId')
  remove( @Token() token: tokenType,
  @Param('productId') productId: string,
) {
    return this.reviewService.remove(token,productId);
  }
}
