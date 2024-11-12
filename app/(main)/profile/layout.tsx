import { PropsWithChildren } from "react";
import ProfileLayoutComponent from "@/components/layouts/profile-layout/ProfileLayout";

const ProfileLayout = async ({ children }: PropsWithChildren) => {
  return <ProfileLayoutComponent>{children}</ProfileLayoutComponent>;
};

export default ProfileLayout;
