import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

const ProfileLayout = async ({ children }: PropsWithChildren) => {
  const cookieStore = cookies();
  const token = cookieStore.get("jwt");

  if (!token) {
    redirect("/register");
  }

  return children;
};

export default ProfileLayout;
