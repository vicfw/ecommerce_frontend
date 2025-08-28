import UI_Typography from "@/components/ui/typography/UI_Typography";
import { SearchInput } from "@/components/ui/search-input";
import { useBrands } from "./useBrands";
import { useSidebar } from "../useSidebar";
import Link from "next/link";

const Brands = () => {
  const { get, on, state } = useBrands();
  const { on: sidebarActions } = useSidebar();

  const handleBrandClick = () => {
    sidebarActions.handleOpenSidebar();
  };

  return (
    <div className="w-full">
      <SearchInput
        placeholder="جست و جو در برند ها"
        onSearch={on.search}
        className="w-full mb-4 placeholder:text-lg"
      />
      <div className="flex flex-col gap-1 mt-5">
        {get.brands?.data.map((brand) => (
          <div className="flex items-center gap-2" key={brand.id}>
            <Link href={`/brands/${brand.slug}`} onClick={handleBrandClick}>
              <UI_Typography className="reg14">{brand.name}</UI_Typography>
            </Link>

            <Link href={`/brands/${brand.slug}`} onClick={handleBrandClick}>
              <UI_Typography className="reg14">
                ( {brand.engName} )
              </UI_Typography>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
