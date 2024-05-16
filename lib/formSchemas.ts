import { z } from "zod";

export const registerFormSchema = z.object({
  name: z.string({ required_error: "لطفا نام خود را وارد نمایید" }),
  email: z.string().email(),
  password: z.string(),
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;
