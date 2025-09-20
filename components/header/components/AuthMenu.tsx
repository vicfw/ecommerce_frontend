"use client";

import { getClientSideCookie } from "@/lib/utils";
import ProfileMenu from "./ProfileMenu";
import LoginButton from "./LoginButton";

const AuthMenu = () => {
  const token = getClientSideCookie("jwt");

  return token ? <ProfileMenu /> : <LoginButton />;
};

export default AuthMenu;
