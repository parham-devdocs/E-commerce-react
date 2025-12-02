import { z } from "zod";
import { createZodDto } from "nestjs-zod";

  export const CreateProductSchema = z.object({
    name: z.string(  "product name is needed" ).min(1, "name is needed"),
    brand: z.string(  "brand is needed" ).min(1, "brand is needed"),
    category: z.string(  "category is needed" ).min(1, "category is needed"),
    price: z.number( "price must be a number" ).positive("price must be greater than 0"),
    discountPercentage: z
      .number( "discount percentage must be a number" )
      .min(0, "discount percentage must be at least 0")
      .max(100, "discount percentage cannot exceed 100")
      .optional()
      .default(0),
    attributes: z
      .record(z.string(),z.string())
      .optional()
      .default({}),
    inStock: z
      .boolean( "inStock must be a boolean" )
      .optional()
      .default(true),
    count: z
      .number( "count must be a number" )
      .int("count must be an integer")
      .min(0, "count cannot be negative")
      .optional()
      .default(0),
    images: z
      .array(z.string().min(1, "image URL cannot be empty"))
      .min(1, "at least one image is required"),
    description: z
      .string( "description is required" )
      .min(1, "description is needed")
      .max(1000, "description must be at most 1000 characters"),
  });
export class CreateProductDto extends createZodDto( CreateProductSchema) {}
 