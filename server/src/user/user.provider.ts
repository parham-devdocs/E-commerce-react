import { DataSource } from 'typeorm';
import { AUTH } from 'src/auth/entities/user.entity';

export const userProvider = [
  {
    provide: 'AUTH_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AUTH),
    inject: ['DATA_SOURCE'],
  },
];
