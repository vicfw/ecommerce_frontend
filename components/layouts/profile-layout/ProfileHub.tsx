"use client";

import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProfileMenu from "./ProfileMenu";

const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";

const ProfileHub = () => {
  const router = useRouter();

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const redirectIfDesktop = () => {
      if (mediaQuery.matches) {
        router.replace("/profile/personal-info");
      }
    };

    redirectIfDesktop();
    mediaQuery.addEventListener("change", redirectIfDesktop);
    return () => mediaQuery.removeEventListener("change", redirectIfDesktop);
  }, [router]);

  return (
    <>
      <div className="md:hidden pb-20">
        <ProfileMenu />
      </div>
      <div className="hidden md:flex min-h-[200px] items-center justify-center">
        <Loader />
      </div>
    </>
  );
};

export default ProfileHub;
