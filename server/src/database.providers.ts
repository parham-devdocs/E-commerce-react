import * as mongoose from 'mongoose';
import { DataSource } from 'typeorm';
import { AUTH } from './auth/entities/user.entity';
import { Review } from './review/entities/review.entity';
import { CartItem } from './cart/entities/cart-item.entity';
import { Cart } from './cart/entities/cart.entity';
import { Invoice } from './payment/entities/payment.entity';
import { Product } from './products/product.entity';
import { Attribute } from './products/attribute.entity';
import { AttributeValue } from './products/attribute-value.entity';
export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT as unknown as number,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [
          AUTH,
          Review,
          CartItem,
          Cart,
          Invoice,
          Product,
          Attribute,
          AttributeValue,
        ],

        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
