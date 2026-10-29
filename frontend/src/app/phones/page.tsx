import type { Metadata } from "next";
import CatalogClient from "@/components/CatalogClient/CatalogClient";
import { getBrands, getProducts, getSite } from "@/services/api";

export async function generateMetadata(): Promise<Metadata> {
  const { pages } = await getSite();
  const p = pages.phones;
  return { title: p.seoTitle, description: p.seoDescription, alternates: { canonical: "/phones" } };
}

export default async function PhonesPage({ searchParams }: { searchParams: { brand?: string } }) {
  const [site, brands, products] = await Promise.all([getSite(), getBrands(), getProducts()]);
  const page = site.pages.phones;

  return (
    <div className="mx-auto max-w-[1240px] px-5 pb-24 pt-14 lg:px-8">
      <p className="eyebrow">Mobile Mall Darbhanga</p>
      <header className="mx-auto max-w-[700px] text-center">
        <h1 className="h-display text-[56px] md:text-[68px]">{page.title}</h1>
        <p className="mt-5 text-[17px] leading-8 text-ink/90">
          {products.length} handsets across {brands.length} leading brands. {page.subtitle}
        </p>
      </header>
      <CatalogClient products={products} brands={brands} settings={site.settings} initialBrand={searchParams.brand} />
    </div>
  );
}
