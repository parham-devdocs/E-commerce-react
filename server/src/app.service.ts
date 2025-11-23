import { Inject, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
interface Cat extends Document {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}
@Injectable()
export class AppService {
  constructor(
    @Inject('CAT_MODEL')
    private catModel: Model<Cat>,
  ) {}
  getHello(): string {
    const data = new this.catModel({ name: 'p', age: 22, breed: 's' });
    data.save();
    return 'Hello World!';
  }
  async findCats(): Promise<any> {
    const data = await this.catModel.find();
    return data;
  }
}
