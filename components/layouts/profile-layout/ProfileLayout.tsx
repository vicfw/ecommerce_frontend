import { Container } from "@/components/container/Container";
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
    <Container component="main">
      <div className="grid grid-cols-[1fr_3fr] gap-5 w-full items-start">
        <div className="border rounded-lg  py-4">
          <ProfileMenu />
        </div>
        <div className="border rounded-lg">{children}</div>
      </div>
    </Container>
  );
};

export default ProfileLayout;
