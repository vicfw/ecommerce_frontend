import { getUserInfoFromCookies } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const usePersonalInfo = () => {
  const searchParams = useSearchParams();
  const identificationForm = searchParams.get("identificationForm");

  const userInfo = getUserInfoFromCookies();

  const [openUserInfoForm, setOpenUserInfoForm] = useState(false);

  const handleToggleOpenUserInfoForm = () => {
    setOpenUserInfoForm((prev) => !prev);
  };

  useEffect(() => {
    setOpenUserInfoForm(Boolean(identificationForm));
  }, [identificationForm]);

  return {
    get: { openUserInfoForm, userInfo },
    on: { handleToggleOpenUserInfoForm },
  };
};
