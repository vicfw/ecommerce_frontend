import {
  LoginFormData,
  RegisterFormData,
  loginFormSchema,
  registerFormSchema,
} from "@/lib/formSchemas";
import { UserService } from "@/services/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

export const useRegister = () => {
  const [codeView, setCodeView] = useState(false);
  const router = useRouter();

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const userService = new UserService();

  const { mutateAsync: registerUser, isLoading: registerUserLoading } =
    useMutation((data: RegisterFormData) => userService.registerUser(data), {
      onError: (err) => {
        if (err instanceof AxiosError) {
          const data = err.response?.data;

          registerForm.setError(data.cause.field, { message: data.message });
        }
      },
    });

  const { mutateAsync: loginUser, isLoading: loginUserLoading } = useMutation(
    (data: LoginFormData) =>
      userService.loginUser({
        code: loginForm.watch("code"),
        phoneNumber: registerForm.watch("phoneNumber"),
      }),
    {
      onError: (err) => {
        if (err instanceof AxiosError) {
          const data = err.response?.data;

          loginForm.setError(data.cause.field, { message: data.message });
        }
      },
    }
  );

  const registerOnSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data);
      setCodeView(true);
    } catch (e) {}
  };

  const loginOnSubmit = async (data: LoginFormData) => {
    try {
      const {
        data: {
          data: { token },
        },
      } = await loginUser(data);
      document.cookie = "jwt" + "=" + (token || "") + "; path=/";
      router.replace("/");
    } catch (e) {}
  };

  return {
    get: { registerForm, registerUserLoading, codeView, loginForm },
    on: { registerOnSubmit, loginOnSubmit },
  };
};
