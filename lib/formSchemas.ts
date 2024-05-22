import { z } from "zod";

export const registerFormSchema = z.object({
  phoneNumber: z
    .string({ required_error: "لطفا شماره همراه خود را وارد نمایید" })
    .regex(/^(?:(?:(?:\\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$/, {
      message: "لطفا شماره همراه صحیح وارد نمایید",
    }),
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;

export const loginFormSchema = z.object({
  code: z
    .string({ required_error: "لطفا کد ارسالی خود را وارد نمایید" })
    .regex(/^\d{4}$/, {
      message: "کد تایید باید 4 رفمی باشد",
    }),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

export type LoginFormBody = z.infer<typeof loginFormSchema> & {
  phoneNumber: string;
};
