import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3),
  price: z.number().positive(),
  description: z.string().min(10),
});

export const updateProductSchema = z.object({
  name: z.string().min(3).optional(),
  price: z.number().positive().optional(),
  description: z.string().min(10).optional(),
});
