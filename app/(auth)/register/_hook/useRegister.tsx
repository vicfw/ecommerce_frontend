import { RegisterFormData, registerFormSchema } from "@/lib/formSchemas";
import { UserService } from "@/services/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

export const useRegister = () => {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const userService = new UserService();

  const { mutateAsync: registerUser } = useMutation(
    (data: RegisterFormData) => userService.registerUser(data),
    {
      onError: (err) => {
        if (err instanceof AxiosError) {
          const data = err.response?.data;

          form.setError(data.cause.field, { message: data.message });
        }
      },
    }
  );

  const onSubmit = async (data: RegisterFormData) => {
    await registerUser(data);
  };

  return { get: { form }, on: { onSubmit } };
};
