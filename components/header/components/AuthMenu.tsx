"use client";

import { getClientSideCookie } from "@/lib/utils";
import { useGlobalStore } from "@/store/globalStore";
import LoginButton from "./LoginButton";

const AuthMenu = () => {
  const storeToken = useGlobalStore((state) => state.token);
  const token = getClientSideCookie("jwt") || storeToken;

  if (token) return null;

  return <LoginButton />;
};

export default AuthMenu;
