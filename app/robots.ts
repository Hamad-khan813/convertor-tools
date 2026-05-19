import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/_next/",
          "/static/",
          "/api/",
          "/*?*", // Prevent crawl budget wastage on arbitrary search params / tracking queries
        ],
      },
    ],
    sitemap: "https://convertly.com/sitemap.xml",
  };
}
