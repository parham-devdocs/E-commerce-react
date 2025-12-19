import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseInterceptors, UploadedFile, UploadedFiles, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import Token from 'src/customDecorators/token.decorator';
import {type tokenType } from 'src/interfaces';
import {type Response } from 'express';
import {  FileInterceptor} from "@nestjs/platform-express";
import {  } from "express";
import { AuthGuard } from 'src/auth.guard';
import { RoleGuard } from 'src/role.guard';
import { Roles } from 'src/roles.decorator';
import { UserRole } from 'src/auth/entities/user.entity';
@Controller('products')
@UseGuards(AuthGuard, RoleGuard) 

export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles(UserRole.ADMIN)
  @Post()
  async create(@Body() createProductDto: CreateProductDto, @Token() toker:tokenType,@Res({passthrough:true}) res:Response ) {
   const response=await this.productsService.create(createProductDto);
    return response

  }
  @Roles(UserRole.ADMIN)
  @Roles(UserRole.USER)
  @Roles(UserRole.GUEST)
  @Get("pagination/:page")
 async  findAll(@Param('page') page:string, @Token() token:tokenType) {
  const response= await   this.productsService.findAll(page);
console.log(response)
    return response
  }

  @Roles(UserRole.ADMIN)
  @Roles(UserRole.USER)
  @Roles(UserRole.GUEST)
  @Get("/recent")
  getRecentProducts(){
    return this.productsService.getRecentProducts()
  }

  @Roles(UserRole.ADMIN)
  @Roles(UserRole.USER)
  @Roles(UserRole.GUEST)
  @Get("/discount")
  getProductsWithDiscount(){
    return this.productsService.getProductsWithDiscount()
  }

  @Roles(UserRole.ADMIN)
  @Roles(UserRole.USER)
  @Roles(UserRole.GUEST)
  @Get(':id')
  async findOne(@Token() token:tokenType,@Param('id') id: string ) {
    const res=await this.productsService.findOne(id);
    return res

  }

  @Roles(UserRole.ADMIN)
  @Roles(UserRole.USER)
  @Roles(UserRole.GUEST)
  @Get(':id/available')
  async findOneAvailable(@Token() token:tokenType,@Param('id') id: string ) {
    const res=await this.productsService.findOneAvailable(id);
    return res

  }

  @Roles(UserRole.ADMIN)
  @Roles(UserRole.USER)
  @Roles(UserRole.GUEST)
  @Get(':id')
  async findOneByName( name:string, @Res({ passthrough: true }) response: Response) {
    const res=await this.productsService.findOneByName(response,name);
    return res

  }

  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }


  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  @Roles(UserRole.ADMIN)
  @Roles(UserRole.USER)
  @Roles(UserRole.GUEST)
  @Get("images/:productId")
  async getImages(@Token() Token:tokenType, @Param("productId") productId:any ){
    return this.productsService.getProductImages(productId)
  }

  @Roles(UserRole.ADMIN)
  @Post('upload/singleImage/:productId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingleFile(@Token() Token:tokenType, @Param("productId") productId:any ,  @UploadedFile() file: any) {
  return await this.productsService.uploadProductImage(file,productId)
    
  }



}
