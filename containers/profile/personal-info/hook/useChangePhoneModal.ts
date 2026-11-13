import {
  ChangePhoneCodeFormData,
  ChangePhoneFormData,
  changePhoneCodeFormSchema,
  changePhoneFormSchema,
} from "@/lib/formSchemas";
import {
  getUserInfoFromCookies,
  setClientSideCookie,
} from "@/lib/utils";
import { UserService } from "@/services/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

type UseChangePhoneModalArgs = {
  onSuccess: () => void;
  onClose: () => void;
};

export const useChangePhoneModal = ({
  onSuccess,
  onClose,
}: UseChangePhoneModalArgs) => {
  const queryClient = useQueryClient();
  const [codeView, setCodeView] = useState(false);
  const userService = new UserService();

  const phoneForm = useForm<ChangePhoneFormData>({
    resolver: zodResolver(changePhoneFormSchema),
    defaultValues: { phoneNumber: "" },
    mode: "onChange",
  });

  const codeForm = useForm<ChangePhoneCodeFormData>({
    resolver: zodResolver(changePhoneCodeFormSchema),
    defaultValues: { code: "" },
    mode: "onChange",
  });

  const { mutateAsync: requestChangePhone, isPending: requestLoading } =
    useMutation({
      mutationFn: (data: ChangePhoneFormData) =>
        userService.requestChangePhone(data),
      onError: (err) => {
        if (err instanceof AxiosError) {
          const data = err.response?.data;
          phoneForm.setError(data?.cause?.field ?? "phoneNumber", {
            message: data?.message ?? "خطا در ارسال کد",
          });
        }
      },
    });

  const { mutateAsync: verifyChangePhone, isPending: verifyLoading } =
    useMutation({
      mutationFn: (data: ChangePhoneCodeFormData) =>
        userService.verifyChangePhone({
          code: data.code,
          phoneNumber: phoneForm.getValues("phoneNumber"),
        }),
      onError: (err) => {
        if (err instanceof AxiosError) {
          const data = err.response?.data;
          codeForm.setError(data?.cause?.field ?? "code", {
            message: data?.message ?? "کد تایید نامعتبر است",
          });
        }
      },
    });

  const onPhoneSubmit = async (data: ChangePhoneFormData) => {
    try {
      await requestChangePhone(data);
      setCodeView(true);
      codeForm.reset({ code: "" });
    } catch {
      // form errors set in onError
    }
  };

  const onCodeSubmit = async (data: ChangePhoneCodeFormData) => {
    try {
      const response = await verifyChangePhone(data);
      const updated = response.data.data;
      const current = getUserInfoFromCookies() ?? {};
      setClientSideCookie(
        "userInfo",
        JSON.stringify({
          ...current,
          ...updated,
        })
      );
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      setCodeView(false);
      phoneForm.reset({ phoneNumber: "" });
      codeForm.reset({ code: "" });
      onSuccess();
      onClose();
    } catch {
      // form errors set in onError
    }
  };

  const reset = () => {
    setCodeView(false);
    phoneForm.reset({ phoneNumber: "" });
    codeForm.reset({ code: "" });
  };

  return {
    get: {
      phoneForm,
      codeForm,
      codeView,
      requestLoading,
      verifyLoading,
    },
    on: {
      onPhoneSubmit,
      onCodeSubmit,
      reset,
    },
  };
};
