import Loader from "@/components/Loader/Loader";
import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";

const ProfileMenu = dynamic(() => import("./ProfileMenu"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center">
      <Loader />
    </div>
  ),
});

const ProfileLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="w-full">
      <div className="md:grid md:grid-cols-[1fr_3fr] gap-5 w-full items-start">
        <div className="hidden md:block border rounded-lg py-4">
          <ProfileMenu />
        </div>
        <div className="w-full md:border md:rounded-lg">{children}</div>
      </div>
    </main>
  );
};

export default ProfileLayout;
