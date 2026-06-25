import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {  FileInterceptor} from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class FileUploaderInterceptor {
  private fileInterceptor: any  

  constructor(
  ) {}

  intercept(context: ExecutionContext, next: CallHandler):Observable<any> {
    // Use the injected interceptors
    console.log('CombinedInterceptor: Before');
    
    // First, apply logging interceptor
    this.fileInterceptor= FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads/products', // 👈 Specify where to save
          filename: (req, file, callback) => {
            const extension = extname(file.originalname);
            const uniqueSuffix = Date.now() + '-' + file.filename
            callback(null, `product-${uniqueSuffix}${extension}`);
          },
        }),
      })
      
      return next.handle().pipe()
    }
    
  
}