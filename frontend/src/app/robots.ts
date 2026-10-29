import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const block = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "false";
  return { rules: block ? { userAgent: "*", disallow: "/" } : { userAgent: "*", allow: "/", disallow: ["/admin", "/account"] }, sitemap: `${site}/sitemap.xml` };
}
