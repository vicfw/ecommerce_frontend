import { z } from "zod";

export const createAddressSchema = z.object({
  address: z
    .string({ message: "این قسمت نباید خالی باشد!" })
    .min(1, { message: "این قسمت نباید خالی باشد!" }),
  street: z.string().min(1, { message: "این قسمت نباید خالی باشد!" }),
  city: z.string().min(1, { message: "این قسمت نباید خالی باشد!" }),
  zipCode: z.string().min(1, { message: "این قسمت نباید خالی باشد!" }),
  province: z
    .string({ message: "این قسمت نباید خالی باشد!" })
    .min(1, { message: "این قسمت نباید خالی باشد!" }),
  plate: z.string().min(1, { message: "این قسمت نباید خالی باشد!" }),
  floor: z.string().min(1, { message: "این قسمت نباید خالی باشد!" }),
  receiverName: z.string().min(1, { message: "این قسمت نباید خالی باشد!" }),
  receiverLastName: z.string().min(1, { message: "این قسمت نباید خالی باشد!" }),
  receiverPhoneNumber: z
    .string()
    .min(1, { message: "این قسمت نباید خالی باشد!" }),
  neighborhood: z.string().min(1, { message: "این قسمت نباید خالی باشد!" }),
  isDefault: z.boolean().default(false),
});
