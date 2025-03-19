import { Container } from "@/components/container/Container";
import Header from "@/components/header/Header";
import MobileBottomMenu from "@/components/mobile-bottom-menu/MobileBottomMenu";
import { ReactNode } from "react";

export default function MainLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="h-[10px] hidden md:block" />
      <Container component="section">{children}</Container>
      <MobileBottomMenu />
    </div>
  );
}
