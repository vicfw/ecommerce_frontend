import { SearchInput } from "@/components/ui/search-input";
import { SheetHeader } from "@/components/ui/sheet";
import UI_Typography from "@/components/ui/typography/UI_Typography";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useBrands } from "./useBrands";
import { Brand } from "@/types/globalTypes";
import { FetchDataPaginatedResponse } from "@/services/types/config";

type BrandsProps = {
  handleBrandClick: () => void;
  handleSetShowBrands: () => void;
  initialBrands: FetchDataPaginatedResponse<Brand[]>;
};

const Brands = ({
  handleBrandClick,
  handleSetShowBrands,
  initialBrands,
}: BrandsProps) => {
  const { get, on } = useBrands(initialBrands);

  return (
    <>
      <SheetHeader>
        <div className="flex items-center justify-between mt-5">
          <span className="flex-1">برند ها</span>
          <ChevronLeft onClick={handleSetShowBrands} />
        </div>
      </SheetHeader>
      <div className=" mt-5">
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
      </div>
    </>
  );
};

export default Brands;
