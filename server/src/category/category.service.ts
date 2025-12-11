import { ConflictException, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-catgory.dto';
import  { Model } from 'mongoose';
import { Category } from './category.schema';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class CatgoryService {
  constructor(
    @InjectModel('Category') private CategoryModel: Model<Category>
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
  
  async productByCategory(id: string) {
    try {
      const category = await this.CategoryModel
        .findById(id)
        .populate({
          path: 'products',
          model: 'Product',
          strictPopulate: false,
          select: '_id name'
        })
  
      if (!category) {
        return { message: 'Category not found' };
      }
  
      return category; 
    } catch (error: any) {
      if (error.name === 'CastError') {
        return { message: 'Invalid category id' };
      }
      return { error: error.message }
    }
  }
  

  async addProduct(productId: string, categoryId: string) {
    try {
      const result = await this.CategoryModel.findByIdAndUpdate(
        categoryId,
        { $addToSet: { products: productId } , new:true}
      ).populate({
        path: 'products',
        model: 'Product',
        strictPopulate: false,
        select:'_id name'
      });
  
      if (!result) {
        return { message: 'Category not found' };
      }
  
      return result;
    } catch (error: any) {
      if (error.name === 'CastError') {
        return { message: 'Invalid ID format' };
      }
      return { error: error.message };
    }
  }
}


