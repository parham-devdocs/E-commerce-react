import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { type tokenType } from 'src/interfaces';
import Token from 'src/customDecorators/token.decorator';
import { Roles } from 'src/roles.decorator';
import { UserRole } from 'src/auth/entities/user.entity';
import { AuthGuard } from 'src/auth.guard';
import { RoleGuard } from 'src/role.guard';
import { Public } from 'src/customDecorators/publicRoute.decorator';

@Controller('review')
@UseGuards(AuthGuard, RoleGuard) 

export class ReviewController {

  constructor(private readonly reviewService: ReviewService) {  }

  @Roles(UserRole.ADMIN)
  @Roles(UserRole.USER)
   @Post(':productId')
  create(
    @Token() token: tokenType,
    @Param('productId') productId: string, 
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return this.reviewService.create(productId, token, createReviewDto);
  }


   @Public()
  @Get(':productId')
  findall( 
  @Param('productId') productId: string,
) {
  
    return this.reviewService.findAll(productId)
  }


  @Roles(UserRole.ADMIN)
  @Delete(':productId')
  remove( @Token() token: tokenType,
  @Param('productId') productId: string,
) {
    return this.reviewService.remove(token,productId);
  }
}
