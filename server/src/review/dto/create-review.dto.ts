import { createZodDto } from "nestjs-zod";
import {z} from "zod";



const reviewRateSchema = z.object({
  comment: z.string("comment must be a string").min(1, "comment is required"),
  rate: z.number("rate must be a number")
        .min(1, "rate must be at least 1")
        .max(5, "rate must be at most 5")
});



export class CreateReviewDto extends createZodDto(reviewRateSchema) {}
