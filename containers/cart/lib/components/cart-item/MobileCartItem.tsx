import { CartItemType } from "@/types/globalTypes";
import Image from "next/image";

type Props = {
  cartItem: CartItemType;
};

export const MobileCartItem = ({ cartItem }: Props) => {
  return (
    <div className="border w-full flex-col gap-2 rounded shadow-sm py-1 px-2 md:hidden">
      <div className="flex gap-3">
        <Image
          src={cartItem.product.images[0]}
          alt={cartItem.id.toString()}
          width={88}
          height={88}
        />
        <div className="flex w-full flex-col gap-1">
          <div className="flex w-full flex-col-reverse gap-1">
            <span className="reg10 text-gray-600">
              {cartItem.product.prName}
            </span>
          </div>
          <h3 className="line-clamp-2 text-black">
            <span className="reg12">{cartItem.product.prName}</span>
          </h3>

          <div className="mt-1 flex items-center gap-1">
            {/* <Image src={cartItem.product.colorImage}/> */}
          </div>
        </div>
      </div>
    </div>
  );
};
