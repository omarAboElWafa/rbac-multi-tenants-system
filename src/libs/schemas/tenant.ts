import { z } from "zod";

export const manipulateTenantSchema = z.object({
  name: z.string().min(3),
});
