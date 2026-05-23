import { MetadataRoute } from "next";
import { categories } from "@/lib/tools-data";
import { hubPages, conversionPairs, agricultureSpecialPages, siteBaseUrl } from "@/lib/seo-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapList: MetadataRoute.Sitemap = [
    {
      url: siteBaseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${siteBaseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteBaseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteBaseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${siteBaseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // 2. Add Category Pages
  categories.forEach((cat) => {
    sitemapList.push({
      url: `${siteBaseUrl}/${cat.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });

    // 3. Add Popular Tools inside each category
    cat.popularTools.forEach((tool) => {
      sitemapList.push({
        url: `${siteBaseUrl}/${cat.id}/${tool.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9, // Higher priority for converter tools where high search intent lands
      });
    });
  });

  // 4. Add SEO Hub Pages
  hubPages.forEach((hub) => {
    sitemapList.push({
      url: `${siteBaseUrl}/${hub.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  });

  // 5. Add Conversion Pair Pages
  conversionPairs.forEach((pair) => {
    sitemapList.push({
      url: `${siteBaseUrl}/convert/${pair.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  // 6. Add Agriculture Special Pages
  agricultureSpecialPages.forEach((tool) => {
    sitemapList.push({
      url: `${siteBaseUrl}/convert/tool/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  return sitemapList;
}
