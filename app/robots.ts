import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    host: "https://unit-convertor-tools.vercel.app",
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/_next/",
          "/api/",
          "/admin/",
          "/dashboard/",
          "/wp-admin/",
          "/private/",
          "/secret/",
        ],
      },
    ],
    sitemap: "https://unit-convertor-tools.vercel.app/sitemap.xml",
  };
}
