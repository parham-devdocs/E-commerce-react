import * as mongoose from 'mongoose';
import { DataSource } from 'typeorm';
import { AUTH } from './auth/entities/user.entity';
import { Review } from './review/entities/review.entity';
import {CartItem } from "./cart/entities/cart-item.entity";
export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.MONGOOSE_CONNECTION_URI as string),
  },
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
        entities: [AUTH,Review,CartItem],

        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
