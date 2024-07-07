import { Container } from "@/components/container/Container";
import Header from "@/components/header/Header";
import { ReactNode } from "react";

export default function MainLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Header />
      <div className="h-[10px]" />
      <Container component="section">{children}</Container>
    </>
  );
}
