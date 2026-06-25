import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseInterceptors, UploadedFile, UseGuards, BadRequestException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import Token from 'src/customDecorators/token.decorator';
import {type tokenType } from 'src/interfaces';
import {type Response } from 'express';
import {  FileInterceptor} from "@nestjs/platform-express";
import { AuthGuard } from 'src/auth.guard';
import { RoleGuard } from 'src/role.guard';
import { Roles } from 'src/roles.decorator';
import { UserRole } from 'src/auth/entities/user.entity';
import { Public } from 'src/customDecorators/publicRoute.decorator';
import  { type Express } from "express";
import { extname } from 'path';
import { FileUploaderInterceptor } from 'src/interceptors/fileUploader.interceptor';
import { diskStorage } from 'multer';

@Controller('products')
@UseGuards(AuthGuard, RoleGuard) 

export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles(UserRole.ADMIN)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/products',
        filename: (req, file, callback) => {
          // ✅ Fix: Use file.originalname, not file.filename
          const extension = extname(file.originalname);
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          callback(null, `product-${uniqueSuffix}${extension}`);
        },
      }),
      // ✅ Add file filter for validation
      fileFilter: (req, file, callback) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (allowedTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new BadRequestException('Invalid file type'), false);
        }
      },
      // ✅ Add file size limit
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    })
  )
  async create(
    @Body() createProductDTO:CreateProductDto,
    @Token() token: tokenType,
    @Res({ passthrough: true }) res: Response,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // ✅ Check if file exists
    if (!file) {
      throw new BadRequestException('File is required');
    }

    // ✅ Log file info
    console.log('File uploaded:', {
      originalName: file.originalname,
      filename: file.filename,
      size: file.size,
      mimetype: file.mimetype,
      path: file.path,
    });
const newProduct=await this.productsService.create({...createProductDTO,images:[file.path]})

   
    return {
      success: true,
      message: 'Product created successfully',
      file:newProduct.data
    };
  }

  
  @Roles(UserRole.ADMIN)
  @Get("list/:page")
 async  findAll(@Param('page') page:string) {
  const response= await   this.productsService.findAll(page);
console.log(response)
    return response
  }
 
  @Public()
  @Get("recent/:page")
  getRecentProducts(@Param('page') page:string){
    return this.productsService.getRecentProducts(page)
  }

 @Public()
  @Get("/discount/:page")
  getProductsWithDiscount(@Param('page') page:string){
    return this.productsService.getProductsWithDiscount(page)
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string ) {
    const res=await this.productsService.findOne(id);
    return res

  }

  @Public()
  @Get(':id/available')
  async findOneAvailable(@Param('id') id: string ) {
    const res=await this.productsService.findOneAvailable(id);
    return res

  }

  @Public()
  @Get(':id')
  async findOneByName( name:string, @Res({ passthrough: true }) response: Response) {
    const res=await this.productsService.findOneByName(response,name);
    return res

  }

  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }


  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  @Public()
  @Get("images/:productId")
  async getImages( @Param("productId") productId:any ){
    return this.productsService.getProductImages(productId)
  }












  @Roles(UserRole.ADMIN)
  @Post('upload/:productId')
    @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: '../uploads/products',
          filename: (req, file, callback) => {
            // ✅ Fix: Use file.originalname, not file.filename
            const extension = extname(file.originalname);
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            callback(null, `product-${uniqueSuffix}${extension}`);
          },
        }),
        // ✅ Add file filter for validation
        fileFilter: (req, file, callback) => {
          const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
          if (allowedTypes.includes(file.mimetype)) {
            callback(null, true);
          } else {
            callback(new BadRequestException('Invalid file type'), false);
          }
        },
        // ✅ Add file size limit
        limits: {
          fileSize: 5 * 1024 * 1024, // 5MB
        },
      })
    )
  async uploadSingleFile(@Token() Token:tokenType, @Param("productId") productId:any  ,@UploadedFile() file: any) {
  return await this.productsService.uploadProductImage(file,productId)
    
  }



}
