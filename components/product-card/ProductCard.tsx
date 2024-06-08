import { Product } from "@/types/globalTypes";
import Image from "next/image";
import { Button } from "../ui/button";
import UI_Typography from "../ui/typography/UI_Typography";

type ProductCardProps = Product;

export const ProductCard = ({
  name,
  images,
  price,
  discount,
}: ProductCardProps) => {
  return (
    <article className="flex flex-col gap-10 border py-3 px-4 rounded-md">
      <div className="flex justify-center items-center">
        <Image src={images[0]} alt="" width={200} height={200} />
      </div>
      <div>
        <UI_Typography
          className="text-main"
          variant="Medium/Med16"
          component="h3"
        >
          {name}
        </UI_Typography>
      </div>
      <div className="flex justify-between items-center">
        {discount ? (
          <UI_Typography
            variant="Medium/Med12"
            className="bg-destructive px-2  py-1 rounded-xl text-white"
          >
            %{discount}
          </UI_Typography>
        ) : null}

        <UI_Typography
          className="text-main w-full text-left"
          variant="Medium/Med16"
          component="p"
        >
          {price.toLocaleString()} تومان
        </UI_Typography>
      </div>
      <div className="flex justify-center items-center">
        <Button>
          <UI_Typography variant="Medium/Med14">
            افزودن به سبد خرید
          </UI_Typography>
        </Button>
      </div>
    </article>
  );
};
