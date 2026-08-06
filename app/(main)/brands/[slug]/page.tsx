import { BrandService } from "@/services/brandService";
import BrandsProducts from "@/containers/brands/BrandsProducts";
import { CATALOG_TTL_SECONDS } from "@/lib/catalogCache";

export const revalidate = CATALOG_TTL_SECONDS;

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const brandService = new BrandService();
  const initialData = await brandService.getBrandProducts(slug);

  return <BrandsProducts initialData={initialData} slug={slug} />;
}
