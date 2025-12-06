import { DataSource } from 'typeorm';
import { CartItem } from './entities/cart-item.entity';

export const cartProvider = [
  {
    provide: 'CART_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CartItem),
    inject: ['DATA_SOURCE'],
  },
];
