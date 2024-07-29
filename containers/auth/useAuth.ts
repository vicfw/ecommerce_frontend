import {
  LoginFormData,
  RegisterFormData,
  loginFormSchema,
  registerFormSchema,
} from "@/lib/formSchemas";
import {
  getClientSideCookie,
  removeClientSideCookie,
  setClientSideCookie,
} from "@/lib/utils";
import { CartService } from "@/services/cartService";
import { UserService } from "@/services/userService";
import { useGlobalStore } from "@/store/globalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

export const useAuth = () => {
  const uuid = getClientSideCookie("uuid");
  // globalStore
  const { handleUpdateToken, handleUpdateUser } = useGlobalStore();
  const [codeView, setCodeView] = useState(false);
  const [counterKey, setCounterKey] = useState(0);
  const [counterFinishedMessage, setCounterFinishedMessage] = useState({
    message: "",
    status: "",
  });

  const router = useRouter();

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const userService = new UserService();
  const cartService = new CartService();

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

  const { mutateAsync: matchAnonCart } = useMutation(
    (data: { userId: number }) => cartService.matchAnonCart(data.userId)
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
          data: { token, id, phoneNumber },
        },
      } = await loginUser(data);

      // globalState
      handleUpdateToken(token);
      handleUpdateUser({ id, phoneNumber });

      if (uuid) {
        await handleMatchAnonCart(id);
      }

      setClientSideCookie("jwt", token);
      // remove uuid because this user is not anonyms anymore
      removeClientSideCookie("uuid");
      router.replace("/");
    } catch (e) {}
  };

  const handleMatchAnonCart = async (userId: number) => {
    await matchAnonCart({ userId });
  };

  const onCountDownComplete = () => {
    setCounterFinishedMessage({
      message: "ارسال دوباره کد",
      status: "pending",
    });
  };

  const onCodeResend = async () => {
    await registerOnSubmit({ phoneNumber: registerForm.watch("phoneNumber") });
    loginForm.reset();
    setCounterFinishedMessage({
      message: "کد با موفقیت ارسال شد",
      status: "success",
    });
    setCounterKey((prev) => prev + 1);
  };

  const countDownChildren = ({ remainingTime }: { remainingTime: number }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return {
    get: {
      registerForm,
      registerUserLoading,
      loginUserLoading,
      codeView,
      loginForm,
      counterKey,
      countDownChildren,
      counterFinishedMessage,
    },
    on: { registerOnSubmit, loginOnSubmit, onCountDownComplete, onCodeResend },
  };
};
