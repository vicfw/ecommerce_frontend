import { Container } from "@/components/container/Container";
import Header from "@/components/header/Header";
import MobileBottomMenu from "@/components/mobile-bottom-menu/MobileBottomMenu";
import { MOBILE_BOTTOM_MENU_HEIGHT } from "@/constants";
import { ReactNode } from "react";

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
        <MobileBottomMenu />
      </Container>
    </>
  );
}
