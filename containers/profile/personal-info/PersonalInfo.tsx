"use client";

import { EditProfileCol } from "./components/EditProfileCol";
import { UserInfoModal } from "./components/UserInfoModal";
import { usePersonalInfo } from "./hook/usePersonalInfo";

export const PersonalInfo = () => {
  const { get, on } = usePersonalInfo();

  return (
    <>
      <div className="lg:grid lg:grid-cols-2 px-6 pb-6">
        {/* name and lastName - LEFT */}
        <EditProfileCol
          label="نام و نام خانوادگی"
          value={`${get.userInfo?.name ?? ""} ${get.userInfo?.lastName ?? ""}`}
          className="border-l-[1px] border-b-[1px] border-neutral-100"
          onClick={on.handleToggleOpenUserInfoForm}
        />
        <EditProfileCol
          label="شماره موبایل"
          value={get.userInfo?.phoneNumber}
          // todo : open change number mobile
          className="border-b-[1px] border-neutral-100 pr-4 pl-0"
          onClick={() => {}}
        />
      </div>
      <UserInfoModal
        handleToggleDialog={on.handleToggleOpenUserInfoForm}
        openDialog={get.openUserInfoForm}
      />
    </>
  );
};
