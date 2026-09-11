"use client";

import { getClientSideCookie } from "@/lib/utils";
import LoginButton from "./LoginButton";

const AuthMenu = () => {
  const token = getClientSideCookie("jwt");

  if (token) return null;

  return <LoginButton />;
};

export default AuthMenu;
