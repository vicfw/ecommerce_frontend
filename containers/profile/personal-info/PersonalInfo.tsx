"use client";

import { UserInfoModal } from "./components/UserInfoModal";
import { usePersonalInfo } from "./hook/usePersonalInfo";

export const PersonalInfo = () => {
  const { get, on } = usePersonalInfo();

  return (
    <div>
      <UserInfoModal
        handleToggleDialog={on.handleToggleOpenUserInfoForm}
        openDialog={get.openUserInfoForm}
      />
    </div>
  );
};
