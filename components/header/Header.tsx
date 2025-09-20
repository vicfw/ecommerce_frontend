import { CART_PAGE_LINK } from "@/constants";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Container } from "../container/Container";
import { SearchInput } from "../ui/search-input";
import AuthMenu from "./components/AuthMenu";
import CartLength from "./components/CartLength";
import HamburgerMenu from "./components/HamburgerMenu";
import LoginButton from "./components/LoginButton";
import { NavigationMenu } from "./components/NavigationMenu";
import Sidebar from "./components/sidebar/Sidebar";
import { BrandService } from "@/services/brandService";

const Header = async () => {
  const brands = await new BrandService().getBrands();

  return (
    <Container
      component="header"
      className="border-b shadow-sm  md:border-none md:shadow-none sticky md:static top-0 z-10 bg-white md-h-auto h-[60px]"
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
            <NavigationMenu />
          </div>

          <Link
            href={CART_PAGE_LINK}
            className="md:border-r-2 md:pr-5 relative"
          >
            <ShoppingCart className="text-main md:w-7 md:h-7 h-7 w-7" />
            <CartLength />
          </Link>

          {/* Desktop: Show LoginButton, Mobile: Show ProfileMenu if logged in */}
          <div className="hidden md:block">
            <LoginButton />
          </div>

          {/* Mobile Profile Menu */}
          <AuthMenu />

          <HamburgerMenu />
        </div>
        {/* Sidebar */}
        <Sidebar brands={brands} />
      </section>
    </Container>
  );
};

export default Header;
