import { ConflictException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model, MongooseError } from 'mongoose';
import { Product } from "./product.interface";
import { Response } from "express";
@Injectable()
export class ProductsService {
  constructor(
    @Inject("PRODUCT_MODEL")
    private productModel: Model<Product>,
  ){}
  async create(createProductDto: CreateProductDto) {
      const existing = await this.productModel.findOne({ name: createProductDto.name }).lean();
    if (existing) {
      throw new ConflictException('Product with this name already exists');
    }
    try {

      const newProduct = new this.productModel(createProductDto);
      const saved = await newProduct.save();
      return{message:"product created",data:saved}  
    } catch (error) {
      // Log error in real app
      throw new InternalServerErrorException('Failed to create product');
    }
  }

  findAll() {
    return `This action returns all products`;
  }

  async findOne(res:Response, id: string) {
    try {
      const product = await this.productModel.findById(id)

      if (!product) {
        throw new  NotFoundException()
       
      }
  
      return res.status(200).json({
        message: "product retrieved",
        data: product
      });
  
    } catch (error) {
      // Handle invalid ObjectId (CastError)
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

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
