import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { CatgoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-catgory.dto';
import Token from 'src/customDecorators/token.decorator';
import {type tokenType } from 'src/interfaces';

@Controller('category')
export class CatgoryController {
  constructor(private readonly catgoryService: CatgoryService) {}

  @Post()
 async create(@Body() createCatgoryDto: CreateCategoryDto, @Token() token:tokenType) {
    try {
      const {data,message}=await this.catgoryService.create(createCatgoryDto);
    return {data,message}
    } catch (error) {
      return {error}
    }
    
  }

  @Get()
   findAll( @Token() token:tokenType) {
  const response= this.catgoryService.findAll()
    return response
  }

  @Get(':id')
  findOne(@Token() token:tokenType ,@Param('id') id: string) {
  
    return this.catgoryService.findOne(id);
  }


  @Delete(':id')
  remove(@Token() token:tokenType ,@Param('id') id: string) {
    return this.catgoryService.remove(id);
  }

  @Get("/products/:id")
  findProducts(@Token() token:tokenType ,@Param('id') id: string){
    console.log(token)
return this.catgoryService.productByCategory(id)
  }

  @Post(":productId/:categoryId")
  addProducts(@Token() token:tokenType ,@Param('productId') productId: string,@Param('categoryId') categoryId:string){
return this.catgoryService.addProduct(productId,categoryId)
  }
}
