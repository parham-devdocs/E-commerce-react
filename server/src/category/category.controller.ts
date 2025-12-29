import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CatgoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-catgory.dto';
import Token from 'src/customDecorators/token.decorator';
import {type tokenType } from 'src/interfaces';
import { Roles } from 'src/roles.decorator';
import { UserRole } from 'src/auth/entities/user.entity';
import { AuthGuard } from 'src/auth.guard';
import { RoleGuard } from 'src/role.guard';
import { Public } from 'src/customDecorators/publicRoute.decorator';

@Controller('category')
@UseGuards(AuthGuard, RoleGuard) 

export class CatgoryController {
  constructor(private readonly catgoryService: CatgoryService) {}

  @Post()
  @Roles(UserRole.ADMIN)

 async create(@Body() createCatgoryDto: CreateCategoryDto) {
    try {
      const {data,message}=await this.catgoryService.create(createCatgoryDto);
    return {data,message}
    } catch (error) {
      return {error}
    }
    
  }

  @Public()
  @Get()
   findAll( ) {
  const response= this.catgoryService.findAll()
    return response
  }

  @Public()
  @Get(':id')
  findOne(@Token() token:tokenType ,@Param('id') id: string) {
  
    return this.catgoryService.findOne(id);
  }


  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Token() token:tokenType ,@Param('id') id: string) {
    return this.catgoryService.remove(id);
  }

  @Get("/products/:id")
  @Roles(UserRole.ADMIN)
  @Roles(UserRole.USER)
  @Roles(UserRole.GUEST)

  findProducts(@Token() token:tokenType ,@Param('id') id: string){
return this.catgoryService.productByCategory(id)
  }

  @Post(":productId/:categoryId")
  @Roles(UserRole.ADMIN)

  addProducts(@Token() token:tokenType ,@Param('productId') productId: string,@Param('categoryId') categoryId:string){
return this.catgoryService.addProduct(productId,categoryId)
  }
}
