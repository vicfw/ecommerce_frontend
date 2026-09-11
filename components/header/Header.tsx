import { CART_PAGE_LINK } from "@/constants";
import { getSiteSettingsSafe } from "@/lib/siteSettings";
import { BrandService } from "@/services/brandService";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Container } from "../container/Container";
import { SiteLogo } from "../site-logo/SiteLogo";
import AuthMenu from "./components/AuthMenu";
import CartLength from "./components/CartLength";
import CategoriesMenu from "./components/CategoriesMenu";
import HamburgerMenu from "./components/HamburgerMenu";
import { NavigationMenu } from "./components/NavigationMenu";
import ProductSearch from "./components/ProductSearch";
import Sidebar from "./components/sidebar/Sidebar";

const Header = async () => {
  const [brands, siteSettings] = await Promise.all([
    new BrandService().getBrands(),
    getSiteSettingsSafe(),
  ]);

  return (
    <Container
      component="header"
      className="border-b shadow-sm md:border-none md:shadow-none fixed md:static top-0 left-0 right-0 z-50 bg-background h-[60px] md:h-auto"
    >
      <section className="w-full py-0 md:py-3 flex relative z-2 ">
        <div className="flex flex-1 items-center grow gap-5">
          <SiteLogo
            settings={siteSettings}
            className="h-12 md:h-16 w-auto object-contain"
          />
          <CategoriesMenu />
          <div className="grow ml-auto hidden md:flex">
            <div className="md:w-[600px]">
              <ProductSearch />
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
