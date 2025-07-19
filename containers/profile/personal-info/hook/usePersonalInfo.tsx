import { getUserInfoFromCookies } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useLayoutEffect } from "react";

export const usePersonalInfo = () => {
  const searchParams = useSearchParams();
  const identificationForm = searchParams.get("identificationForm");

  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [openUserInfoForm, setOpenUserInfoForm] = useState(false);

  // Handle hydration error by loading user info on client side
  useLayoutEffect(() => {
    const userData = getUserInfoFromCookies();
    setUserInfo(userData);
    setIsLoaded(true);
  }, []);

  const handleToggleOpenUserInfoForm = () => {
    setOpenUserInfoForm((prev) => !prev);
  };

  useEffect(() => {
    setOpenUserInfoForm(Boolean(identificationForm));
  }, [identificationForm]);

  return {
    get: { openUserInfoForm, userInfo, isLoaded },
    on: { handleToggleOpenUserInfoForm },
  };
};
