import ProductDetailContainer from "@/containers/product-detail/ProductDetail";
import { CATALOG_TTL_SECONDS } from "@/lib/catalogCache";
import { ProductService } from "@/services/productService";

const productService = new ProductService();

export const revalidate = CATALOG_TTL_SECONDS;

type ProductDetailPageProps = {
  params: { slug: string };
};

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const { data } = await productService.getProduct(params.slug);

  return <ProductDetailContainer product={data} />;
};

export default ProductDetailPage;
