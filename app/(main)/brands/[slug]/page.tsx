import { BrandService } from "@/services/brandService";
import BrandsProducts from "@/containers/brands/BrandsProducts";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const brandService = new BrandService();
  const initialData = await brandService.getBrandProducts(slug);

  return <BrandsProducts initialData={initialData} slug={slug} />;
}

// export const revalidate = 60;
