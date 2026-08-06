import UI_Typography from "@/components/ui/typography/UI_Typography";
import { ProductListContainer } from "@/containers/home/ProductList";
import { ProductService } from "@/services/productService";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  if (!query) {
    return (
      <div className="w-full py-8">
        <UI_Typography className="med16 text-neutral-600">
          عبارتی برای جستجو وارد کنید
        </UI_Typography>
      </div>
    );
  }

  const result = await new ProductService().getProducts({ search: query });
  const products = result.data ?? [];

  return (
    <div className="w-full py-8">
      <UI_Typography className="med16 mb-6">
        نتایج جستجو برای «{query}»
      </UI_Typography>

      {products.length === 0 ? (
        <UI_Typography className="reg14 text-neutral-500">
          محصولی یافت نشد
        </UI_Typography>
      ) : (
        <ProductListContainer products={products} />
      )}
    </div>
  );
};

export default SearchPage;
