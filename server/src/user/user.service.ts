import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { AUTH } from 'src/auth/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject("AUTH_REPOSITORY")  private userModel:Model<AUTH>,


  ){}
 
  async findAll(page: number) {
    const skip = (page - 1) * 10;
    const take = 10; 
  
  
    const users = await this.userModel.find({
      skip,
      take,
    }); 
       return users; 
  }

  async findOneByEmail(email:string) {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with ID ${email} not found`);
    }
    return user;
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(id)
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  
   
  }

    async remove(id: number) {
      const user = await this.userModel.findOne({where:{id}});
      
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
    
      await this.userModel.findOneAndDelete({id:11});
      return user; // return before deletion
    }
}
