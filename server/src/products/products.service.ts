import { BadRequestException, ConflictException, HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { isValidObjectId, Model, ObjectId } from 'mongoose';
import { Product } from "src/products/product.schema";
import { Response } from "express";
import { Category } from 'src/category/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { dateComparison } from "../utils";
import { fi } from 'zod/v4/locales';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel("Product")     private productModel: Model<Product>,

    @InjectModel('Category') private categoryModel: Model<Category>


  ){}

  async create(createProductDto: CreateProductDto) {
    // 1. Validate that category ID is a valid ObjectId
    if (!isValidObjectId(createProductDto.category)) {
      throw new BadRequestException('Invalid category ID');
    }

    // 2. Check if category exists
    const categoryExists = await this.categoryModel.findById(createProductDto.category).exec();
    
    if (!categoryExists) {
      throw new NotFoundException('Category not found');
    }

    const existingProduct = await this.productModel.findOne({ name: createProductDto.name }).exec();
    if (existingProduct) {
      throw new ConflictException('Product with this name already exists');
    }

    try {
      const newProduct = new this.productModel(createProductDto);
      const saved = await newProduct.save();
      return {
        message: 'Product created',
        data: saved,
      };

    } catch (error) {
      // Optional: log error (e.g., with Winston)
      console.error('Product creation error:', error);
      throw new InternalServerErrorException('Failed to create product');
    }
  }



  async findAll(page: string) {
    const pageNum = parseInt(page, 10) || 1;
    const limit = 10;
    const skip = (pageNum - 1) * limit;
  
    const [products, total] = await Promise.all([
      this.productModel.find().skip(skip).limit(limit).lean(),
      this.productModel.countDocuments()
    ]);
    
  if (products.length===0) {

    throw new NotFoundException()
  }
    return {
      data: products,
    
    };
  }
  async findOne(id: string) {
    if (!isValidObjectId(id)) {
      throw new HttpException('Invalid productId', HttpStatus.BAD_REQUEST);
    }
  
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
  
    return {
      message: 'product retrieved',
      data: product,
    };
  }
  

  async findOneByName(res:Response, name: string) {
    try {
      const product = await this.productModel.find({name})
      if (!product) {
        return res.status(404).json({
          message: "product not found"
        });
      }
  
      return res.status(200)
  
    } catch (error) {
      if (error.name === 'CastError') {
        return res.status(400).json({
          message: "invalid product id"
        });
      }
  
      return res.status(500).json({
        message: "server internal error",
        error: error.message
      });
    }
  }

  async getRecentProducts(){
    const products = await this.productModel
    .find({ inStock: true,count:{$gt:0} })       
    .sort({ createdAt: -1 })      
    .limit(10)
    .exec();   
    if (!products) {
      throw new NotFoundException("no recent product found")
    }
    return products}

    async getProductsWithDiscount(){
      const product = await this.productModel.find({discountPercentage:{$gt:0},inStock:true}).limit(0)
      console.log(product)
      if (!product) {
        throw new NotFoundException("no recent product found")
      }
      return product}

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  async uploadProductImage(file:any,productId:ObjectId){
   const savedImage=await this.productModel.updateOne({ _id: productId}, { $push: { images: file.filename } })

  return file
  }

  async getProductImages(id:string){
    const product= await this.productModel.findById(id).select({images:true})
    return product?.images
  }
}
