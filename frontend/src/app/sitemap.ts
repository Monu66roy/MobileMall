import type { MetadataRoute } from "next";
import { getProducts } from "@/services/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const pages = ["", "/phones", "/brands", "/lucky-draw", "/about", "/contact"].map((p) => ({
    url: `${site}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7,
  }));
  // Published products only, so drafts/archived items never reach search engines.
  const products = (await getProducts()).map((p) => ({
    url: `${site}/phones/${p.slug}`, changeFrequency: "weekly" as const, priority: 0.6,
  }));
  return [...pages, ...products];
}
