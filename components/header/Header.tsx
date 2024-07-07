"use client";

import { CART_PAGE_LINK, REGISTER_PAGE_LINK } from "@/constants";
import {
  LogIn,
  PersonStanding,
  ShoppingBasketIcon,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { SearchInput } from "../ui/searchInput";
import UI_Typography from "../ui/typography/UI_Typography";
import { useHeader } from "./useHeader";
import { Container } from "../container/Container";

const Header = () => {
  const { get, on } = useHeader();

  return (
    <Container component="header">
      <section className="w-full py-3 flex relative z-2">
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
          <div className="flex grow ml-auto">
            <div className="w-[600px]">
              <SearchInput />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3">
          {!get.token ? (
            <div className="flex items-center gap-5">
              <Link
                href={REGISTER_PAGE_LINK}
                className="border rounded-lg flex items-center py-[8px] px-[16px] gap-2"
              >
                <LogIn className="text-main" />
                <UI_Typography className="text-main" variant="Medium/Med12">
                  ورود | ثبت نام
                </UI_Typography>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <div className="border rounded-lg flex items-center py-[8px] px-[16px] gap-2">
                <PersonStanding className="text-main" />
                <UI_Typography className="text-main" variant="Medium/Med12">
                  خوش آمدید
                </UI_Typography>
              </div>
            </div>
          )}
          <Link href={CART_PAGE_LINK} className=" border-r-2 pr-5 relative">
            <ShoppingCart className="text-main" size={30} />
            <div className="absolute bottom-[-1px] bg-destructive rounded-md w-[19px] h-[19px] flex justify-center items-center p-2">
              <span className="text-[11px] text-white">{get.cartLength}</span>
            </div>
          </Link>
        </div>
      </section>
    </Container>
  );
};

export default Header;
