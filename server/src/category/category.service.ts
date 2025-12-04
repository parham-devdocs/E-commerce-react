import { ConflictException, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-catgory.dto';
import  { Model } from 'mongoose';
import { Category } from "./category.interface";
@Injectable()
export class CatgoryService {
  constructor(
    @Inject("CATEGORY_MODEL")
    private CategoryModel: Model<Category>,
  ){
    
  }
  async create(createCategoryDto: CreateCategoryDto) {
    const existing = await this.CategoryModel.findOne({ 
      title: createCategoryDto.title 
    }).lean();
  
    if (existing) {
      throw new ConflictException('Category already exists');
    }

    try {
      const newCat = new this.CategoryModel(createCategoryDto);
      const saved = await newCat.save();
      return { message: 'Category created', data: saved };
    } catch (error) {
      console.error('Category creation error:', error);
      throw new HttpException('Server Internal Error', 500);
    }
  }

  async findAll() {
    try {
      const categories=await this.CategoryModel.find({})
      if (categories.length===0) {
        throw new NotFoundException("no category found")
      }
      return categories
    } catch (error) {
      console.error('Category creation error:', error);
      throw new HttpException('Server Internal Error', 500)
        }
  
  }

 async findOne(id: string) {
  try {
    const cat = await this.CategoryModel.findById(id)

    if (!cat) {
      throw new  NotFoundException()
     
    }

    return {
      message: "product retrieved",
      data: cat
    }

  } catch (error) {
    if (error.name === 'CastError') {
      return {
        message: "invalid product id"
      }
    }

    return {
      message: "server internal error",
      error: error.message
    }
  }
    }

  async remove(id: string) {
    try {
      const cat=await this.CategoryModel.findByIdAndDelete(id)
      if (!cat) {
        throw new NotFoundException("category not found")
      }
return cat
    } catch (error) {
      if (error.name==="CastError") {
        return {
          message: "invalid product id"
        }
      }
      return {
       
        error: error.message      }
    }
  }
}
