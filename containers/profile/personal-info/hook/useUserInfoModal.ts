import { getUserInfoFromCookies, setClientSideCookie } from "@/lib/utils";
import { createUserInfo } from "@/lib/validations/index.";
import { UpdateUserBody } from "@/services/types/userService.types";
import { UserService } from "@/services/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { z } from "zod";

type CreateAddressSchemaType = z.infer<typeof createUserInfo>;

export const useUserInfoModal = () => {
  const userInfo = getUserInfoFromCookies();

  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get("redirectUrl");

  const form = useForm<CreateAddressSchemaType>({
    resolver: zodResolver(createUserInfo),
    defaultValues: {
      name: userInfo?.name,
      lastName: userInfo?.lastName,
    },
  });

  const { mutateAsync: updateUser } = useMutation({
    mutationFn: (body: UpdateUserBody) => {
      const userService = new UserService();
      return userService.updateUser(body);
    },
  });

  const onSubmit: SubmitHandler<CreateAddressSchemaType> = async (data) => {
    try {
      const updatedUser = await updateUser(data);
      setClientSideCookie("userInfo", JSON.stringify(updatedUser.data.data));

      if (redirectUrl) {
        router.replace(redirectUrl);
      } else {
        router.replace("/profile/personal-info");
      }
    } catch (e) {}
  };

  return { get: { form }, on: { onSubmit } };
};
