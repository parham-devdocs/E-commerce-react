import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model, MongooseError } from 'mongoose';
import { Product } from "./product.interface";
@Injectable()
export class ProductsService {
  constructor(
    @Inject("PRODUCT_MODEL")
    private productModel: Model<Product>,
  ){}
 async create(createProductDto: CreateProductDto) {
  try {
console.log(createProductDto)
    const res=await  new this.productModel(createProductDto).save({timestamps:true})
    return {message:"product created",data:res} ;

  } catch (error) {
    if (error instanceof MongooseError) {
return {message:error.message}}
  
  return {message:"server internal error "}
  }

  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
