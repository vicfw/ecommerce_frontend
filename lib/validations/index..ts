import { z } from "zod";

export const createAddressSchema = z.object({
  address: z
    .string({ message: "اینجا را خالی نگذارید" })
    .min(1, { message: "اینجا را خالی نگذارید" }),
  street: z.string().min(1, { message: "اینجا را خالی نگذارید" }),
  city: z.string().min(1, { message: "اینجا را خالی نگذارید" }),
  zipCode: z.string().min(1, { message: "اینجا را خالی نگذارید" }),
  province: z
    .string({ message: "اینجا را خالی نگذارید" })
    .min(1, { message: "اینجا را خالی نگذارید" }),
  plate: z.string().min(1, { message: "اینجا را خالی نگذارید" }),
  floor: z.string().optional(),
  receiverName: z.string().min(1, { message: "اینجا را خالی نگذارید" }),
  receiverLastName: z.string().min(1, { message: "اینجا را خالی نگذارید" }),
  receiverPhoneNumber: z.string().min(1, { message: "اینجا را خالی نگذارید" }),
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
