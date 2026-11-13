"use client";

import { ChangePhoneModal } from "./components/ChangePhoneModal";
import { EditProfileCol } from "./components/EditProfileCol";
import { UserInfoModal } from "./components/UserInfoModal";
import { usePersonalInfo } from "./hook/usePersonalInfo";
import Loader from "@/components/Loader/Loader";
import ProfileBackHeader from "@/components/layouts/profile-layout/ProfileBackHeader";
import { Button } from "@/components/ui/button";
import UI_Typography from "@/components/ui/typography/UI_Typography";

export const PersonalInfo = () => {
  const { get, on } = usePersonalInfo();

  // Show loader while data is loading to prevent hydration mismatch
  if (!get.isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {/* Mobile Layout */}
      <div className="md:hidden pb-20">
        <ProfileBackHeader title="اطلاعات حساب کاربری" />
        <div className="flex flex-col gap-0">
          <EditProfileCol
            label="نام و نام خانوادگی"
            value={`${get.userInfo?.name ?? ""} ${
              get.userInfo?.lastName ?? ""
            }`}
            className="border-b border-border"
            onClick={on.handleToggleOpenUserInfoForm}
          />
          <EditProfileCol
            label="شماره موبایل"
            value={get.userInfo?.phoneNumber}
            className="border-b border-border"
            onClick={on.handleToggleOpenChangePhoneForm}
            editTestId="change-phone-edit"
            editAriaLabel="ویرایش شماره موبایل"
          />
        </div>
        <div className="px-4 pt-6 pb-2">
          <Button
            type="button"
            variant="outline"
            className="w-full text-destructive hover:text-destructive"
            onClick={on.logout}
          >
            <UI_Typography className="text-destructive">
              خروج از حساب
            </UI_Typography>
          </Button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-2 px-6 pb-6">
        {/* name and lastName - LEFT */}
        <EditProfileCol
          label="نام و نام خانوادگی"
          value={`${get.userInfo?.name ?? ""} ${get.userInfo?.lastName ?? ""}`}
          className="border-l-[1px] border-b-[1px] border-border"
          onClick={on.handleToggleOpenUserInfoForm}
        />
        <EditProfileCol
          label="شماره موبایل"
          value={get.userInfo?.phoneNumber}
          className="border-b-[1px] border-border pr-4 pl-0"
          onClick={on.handleToggleOpenChangePhoneForm}
          editAriaLabel="ویرایش شماره موبایل"
        />
      </div>

      <UserInfoModal
        handleToggleDialog={on.handleToggleOpenUserInfoForm}
        openDialog={get.openUserInfoForm}
      />
      <ChangePhoneModal
        handleToggleDialog={on.handleToggleOpenChangePhoneForm}
        openDialog={get.openChangePhoneForm}
        onSuccess={on.refreshUserInfo}
      />
    </>
  );
};
