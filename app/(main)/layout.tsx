import { Container } from "@/components/container/Container";
import Header from "@/components/header/Header";
import { MOBILE_BOTTOM_MENU_HEIGHT } from "@/constants";
import dynamic from "next/dynamic";
import { ReactNode, Suspense } from "react";

const MobileBottomMenu = dynamic(
  () => import("../../components/mobile-bottom-menu/MobileBottomMenu"),
  { ssr: false }
);

export default function MainLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Header />
      <div className="h-[10px] hidden md:block" />
      <Container
        component="section"
        style={{ marginBottom: MOBILE_BOTTOM_MENU_HEIGHT }}
      >
        {children}
        <Suspense fallback={null}>
          <MobileBottomMenu />
        </Suspense>
      </Container>
    </>
  );
}
