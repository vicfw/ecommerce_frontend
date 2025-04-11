"use client";

import { CART_PAGE_LINK } from "@/constants";
import { AlignJustify, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Container } from "../container/Container";
import Loader from "../Loader/Loader";
import { SearchInput } from "../ui/search-input";
import { NavigationMenu } from "./components/NavigationMenu";
import Sidebar from "./components/sidebar/Sidebar";
import { useHeader } from "./useHeader";

const Header = () => {
  const { get, on } = useHeader();

  return (
    <Container
      component="header"
      className="border-b shadow-sm  md:border-none md:shadow-none sticky md:static top-0 z-10 bg-white h-[55px]"
    >
      <section className="w-full py-0 md:py-3 flex relative z-2 ">
        <div className="flex flex-1 items-center grow gap-5">
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
          </Link>
          <div className="grow ml-auto hidden md:flex">
            <div className="md:w-[600px]">
              <SearchInput />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3">
          <div className="items-center gap-5 hidden md:flex">
            {get.isLoaded ? (
              <NavigationMenu />
            ) : (
              <div className="border rounded-lg flex items-center py-[8px] px-[16px] gap-2  max-h-[40px] justify-center">
                <Loader />
              </div>
            )}
          </div>

          <Link
            href={CART_PAGE_LINK}
            className="md:border-r-2 md:pr-5 relative"
          >
            <ShoppingCart className="text-main md:w-7 md:h-7 h-6 w-6" />
            <div className="absolute bottom-[-1px] bg-destructive rounded-md md:w-[17px] md:h-[17px] w-2 h-2 flex justify-center items-center p-2">
              <span className="text-[11px] text-white">{get.cartLength}</span>
            </div>
          </Link>

          <div
            className="md:hidden cursor-pointer"
            onClick={on.handleOpenSidebar}
          >
            <AlignJustify className="text-main md:w-7 md:h-7 h-6 w-6 mt-[2px]" />
          </div>
        </div>
        {/* Sidebar */}
        <Sidebar />
      </section>
    </Container>
  );
};

export default Header;
