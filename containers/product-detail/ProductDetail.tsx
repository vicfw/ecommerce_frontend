import { Product } from "@/types/globalTypes";

type ProductDetailProps = {
  product: Product;
};

const ProductDetailContainer = async ({ product }: ProductDetailProps) => {
  return (
    <main className="grid lg:grid-cols-[2fr_2fr_1fr] md:grid-cols-1 w-full">
      {/* image slider */}
      <section>a</section>
      <section>a</section>
      <section>a</section>
    </main>
  );
};

export default ProductDetailContainer;
