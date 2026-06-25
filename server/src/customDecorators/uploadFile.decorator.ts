// common/decorators/file-upload.decorator.ts
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

export function UploadFile() {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor('file', {  // ← Remove extra parentheses here
        storage: diskStorage({
          destination: './uploads/products',
          filename: (req, file, callback) => {
            const extension = extname(file.originalname);
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            callback(null, `product-${uniqueSuffix}${extension}`);
          },
        }),
      })
    )
  );
}