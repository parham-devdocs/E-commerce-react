import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import Token from 'src/customDecorators/token.decorator';
import {type tokenType } from 'src/interfaces';
import {type Response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto, @Token() token:tokenType,@Res({passthrough:true}) res:Response ) {
   const response=await this.productsService.create(createProductDto);
    return response

  }

  @Get("pagination/:page")
 async  findAll(@Param('page') page:string, @Token() token:tokenType,@Res({passthrough:true}) res:Response ) {
  const response= await   this.productsService.findAll(page);
console.log(response)
    return response
  }


  @Get(':id')
  async findOne(@Token() token:tokenType,@Param('id') id: string , @Res({ passthrough: true }) response: Response) {
    const res=await this.productsService.findOne(response,id);
    return res

  }
  @Get(':id')
  async findOneByName( name:string, @Res({ passthrough: true }) response: Response) {
    const res=await this.productsService.findOneByName(response,name);
    return res

  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
