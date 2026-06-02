const fs = require("fs");
const path = require("path");

const SITE_URL = process.env.SITE_URL || "https://unit-convertor-tools.vercel.app";
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const ROBOTS_URL = `${SITE_URL}/robots.txt`;
const IMPORTANT_PAGES = ["/", "/categories", "/blog", "/about", "/contact", "/guides", "/terms", "/privacy"];

function parseSitemapUrls(xml) {
  const regex = /<loc>(.*?)<\/loc>/g;
  const urls = [];
  let match;
  while ((match = regex.exec(xml))) {
    urls.push(match[1]);
  }
  return urls;
}

function filePathForLog(name) {
  const logs = path.join(process.cwd(), "scripts", "logs");
  if (!fs.existsSync(logs)) {
    fs.mkdirSync(logs, { recursive: true });
  }
  return path.join(logs, `${name}-${new Date().toISOString().replace(/[:.]/g, "-")}.log`);
}

async function fetchPage(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Unit Convertor Tools SEO Auditor/1.0",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
  });
  const text = await response.text();
  return { url, status: response.status, ok: response.ok, contentType: response.headers.get("content-type"), body: text };
}

async function run() {
  console.log("Starting SEO monitor for:", SITE_URL);

  const robotsResponse = await fetch(ROBOTS_URL);
  if (!robotsResponse.ok) {
    throw new Error(`Failed to load robots.txt (${robotsResponse.status})`);
  }
  const robotsBody = await robotsResponse.text();
  console.log("robots.txt loaded.");

  const sitemapResponse = await fetch(SITEMAP_URL);
  if (!sitemapResponse.ok) {
    throw new Error(`Failed to load sitemap.xml (${sitemapResponse.status})`);
  }
  const sitemapBody = await sitemapResponse.text();
  const sitemapUrls = parseSitemapUrls(sitemapBody).slice(0, 30);
  console.log(`Parsed ${sitemapUrls.length} URLs from sitemap.`);

  const results = [];
  for (const pagePath of IMPORTANT_PAGES) {
    const pageUrl = `${SITE_URL}${pagePath}`;
    const result = await fetchPage(pageUrl);
    const hasCanonical = /<link[^>]+rel=["']canonical["'][^>]*>/i.test(result.body);
    const hasHreflang = /<link[^>]+rel=["']alternate["'][^>]*hreflang=/i.test(result.body);
    results.push({ ...result, hasCanonical, hasHreflang });
    console.log(`Checked ${pageUrl}: ${result.status} canonical=${hasCanonical} hreflang=${hasHreflang}`);
  }

  const sitemapChecks = sitemapUrls.map(async (url) => {
    const result = await fetchPage(url);
    return { url: result.url, status: result.status, ok: result.ok };
  });
  const sitemapResults = await Promise.all(sitemapChecks);
  sitemapResults.forEach((result) => {
    console.log(`Sitemap URL ${result.url}: ${result.status}`);
  });

  const auditLog = filePathForLog("seo-audit");
  const lines = [
    `SEO audit run: ${new Date().toISOString()}`,
    `Site: ${SITE_URL}`,
    "",
    "Robots.txt content:",
    robotsBody.split("\n").slice(0, 20).join("\n"),
    "",
    "Page audit results:",
  ];
  results.forEach((item) => {
    lines.push(`${item.url} | ${item.status} | canonical=${item.hasCanonical} | hreflang=${item.hasHreflang}`);
  });
  lines.push("", "Sitemap sample results:");
  sitemapResults.forEach((item) => {
    lines.push(`${item.url} | ${item.status} | ok=${item.ok}`);
  });
  fs.writeFileSync(auditLog, lines.join("\n"), "utf8");
  console.log("SEO audit log written to", auditLog);

  const hasPageErrors = results.some((item) => !item.ok);
  const hasSitemapErrors = sitemapResults.some((item) => !item.ok);
  if (hasPageErrors || hasSitemapErrors) {
    throw new Error("One or more SEO-critical pages returned non-OK status.");
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
