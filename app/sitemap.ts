import { MetadataRoute } from "next";
import { categories } from "@/lib/tools-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://convertly.com";

  // 1. Add Homepage
  const sitemapList: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  // 2. Add Category Pages
  categories.forEach((cat) => {
    sitemapList.push({
      url: `${baseUrl}/${cat.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });

    // 3. Add Popular Tools inside each category
    cat.popularTools.forEach((tool) => {
      sitemapList.push({
        url: `${baseUrl}/${cat.id}/${tool.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9, // Higher priority for converter tools where high search intent lands
      });
    });
  });

  return sitemapList;
}
