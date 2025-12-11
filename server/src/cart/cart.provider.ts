import { DataSource } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';

export const cartProvider = [
  {
    provide: 'CART_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Cart),
    inject: ['DATA_SOURCE'],
  },
];


export const cartItemProvider = [
  {
    provide: 'CART_ITEM_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CartItem),
    inject: ['DATA_SOURCE'],
  },
];
