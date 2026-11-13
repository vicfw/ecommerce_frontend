import { getUserInfoFromCookies } from "@/lib/utils";
import { useLogout } from "@/hooks/use-logout";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useLayoutEffect } from "react";

export const usePersonalInfo = () => {
  const searchParams = useSearchParams();
  const identificationForm = searchParams.get("identificationForm");
  const { logout } = useLogout();

  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [openUserInfoForm, setOpenUserInfoForm] = useState(false);
  const [openChangePhoneForm, setOpenChangePhoneForm] = useState(false);

  // Handle hydration error by loading user info on client side
  useLayoutEffect(() => {
    const userData = getUserInfoFromCookies();
    setUserInfo(userData);
    setIsLoaded(true);
  }, []);

  const refreshUserInfo = () => {
    setUserInfo(getUserInfoFromCookies());
  };

  const handleToggleOpenUserInfoForm = () => {
    setOpenUserInfoForm((prev) => !prev);
  };

  const handleToggleOpenChangePhoneForm = () => {
    setOpenChangePhoneForm((prev) => !prev);
  };

  useEffect(() => {
    setOpenUserInfoForm(Boolean(identificationForm));
  }, [identificationForm]);

  return {
    get: { openUserInfoForm, openChangePhoneForm, userInfo, isLoaded },
    on: {
      handleToggleOpenUserInfoForm,
      handleToggleOpenChangePhoneForm,
      refreshUserInfo,
      logout,
    },
  };
};
