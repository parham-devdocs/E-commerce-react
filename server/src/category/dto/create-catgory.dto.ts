import { createZodDto } from "nestjs-zod";
import z from "zod";


const CreateCategorySchema=z.object({
    
    title:z.string("title must be string").min(1,"title is required"),
    description:z.string("description must be string").min(1,"description is required")
})
export class CreateCategoryDto extends createZodDto(CreateCategorySchema) {}

