import { PartialType } from '@nestjs/mapped-types';
import { CreateCartItemDTO } from './create-cart.dto';

export class UpdateCartDto extends PartialType(CreateCartItemDTO) {}
