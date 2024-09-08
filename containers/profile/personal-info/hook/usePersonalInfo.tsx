import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const usePersonalInfo = () => {
  const searchParams = useSearchParams();
  const identificationForm = searchParams.get("identificationForm");

  console.log(identificationForm, "identificationForm");

  const [openUserInfoForm, setOpenUserInfoForm] = useState(false);

  const handleToggleOpenUserInfoForm = () => {
    setOpenUserInfoForm((prev) => !prev);
  };

  useEffect(() => {
    setOpenUserInfoForm(Boolean(identificationForm));
  }, [identificationForm]);

  return { get: { openUserInfoForm }, on: { handleToggleOpenUserInfoForm } };
};
