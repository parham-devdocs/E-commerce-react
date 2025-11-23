import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { Product } from "./product.interface";
@Injectable()
export class ProductsService {
  constructor(
    @Inject("PRODUCT_MODEL")
    private productModel: Model<Product>,
  ){}
 async create(createProductDto: CreateProductDto) {
    const res=await  new this.productModel(createProductDto).save()

    return res ;
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
