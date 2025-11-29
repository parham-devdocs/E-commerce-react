import * as mongoose from 'mongoose';
import { DataSource } from 'typeorm';
import { User } from './auth/entities/user.entity';
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
        host: 'localhost',
        port: 5435,
        username: 'testuser',
        password: 'mypassword',
        database: 'testdb',
        entities: [User],

        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
