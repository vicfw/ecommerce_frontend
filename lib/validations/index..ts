import { z } from "zod";

export const createAddressSchema = z.object({
  address: z
    .string()
    .min(1, { message: "اینجا را خالی نگذارید" })
    .min(6, { message: "آدرس باید بیشتر از 6 کارکتر باشد" }),
  street: z.string().min(1, { message: "اینجا را خالی نگذارید" }),
  city: z.string().min(1, { message: "اینجا را خالی نگذارید" }),
  zipCode: z
    .string()
    .min(1, { message: "اینجا را خالی نگذارید" })
    .regex(/^\d+$/, { message: " فقط شامل ارقام باشد" })
    .min(10, { message: "کد پستی باید 10 رقم باشد" })
    .max(10, { message: "کد پستی باید 10 رقم باشد" }),

  province: z
    .string({ message: "اینجا را خالی نگذارید" })
    .min(1, { message: "اینجا را خالی نگذارید" }),
  plate: z
    .string()
    .min(1, { message: "اینجا را خالی نگذارید" })
    .regex(/^\d+$/, { message: " فقط شامل ارقام باشد" }),
  floor: z.string().optional(),
  receiverName: z.string().min(1, { message: "اینجا را خالی نگذارید" }),
  receiverLastName: z.string().min(1, { message: "اینجا را خالی نگذارید" }),
  receiverPhoneNumber: z
    .string()
    .regex(/^\d+$/, { message: " فقط شامل ارقام باشد" })
    .min(1, { message: "اینجا را خالی نگذارید" }),
  isDefault: z.boolean().default(false),
});

export const createUserInfo = z.object({
  name: z
    .string({ message: "اینجا را خالی نگذارید" })
    .min(1, { message: "اینجا را خالی نگذارید" }),
  lastName: z
    .string({ message: "اینجا را خالی نگذارید" })
    .min(1, { message: "اینجا را خالی نگذارید" }),
});

export const createCommentSchema = z.object({
  body: z.string().min(1, "دیدگاه نمی‌تواند خالی باشد"),
  productId: z.number(),
  userId: z.number(),
  image: z.string(),
});

export type CreateCommentSchema = z.infer<typeof createCommentSchema>;
