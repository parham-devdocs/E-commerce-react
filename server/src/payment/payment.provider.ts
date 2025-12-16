import { DataSource } from 'typeorm';
import {Invoice} from 'src/payment/entities/payment.entity';

export const paymentProvider = [
  {
    provide: 'PAYMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Invoice),
    inject: ['DATA_SOURCE'],
  },
];
