import { z } from "zod";

export const userRegisterationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(3),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
