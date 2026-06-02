const fs = require("fs");
const path = require("path");

const SITE_URL = process.env.SITE_URL || "https://unit-convertor-tools.vercel.app";
const SITEMAP_URL = process.env.SITEMAP_URL || `${SITE_URL}/sitemap.xml`;
const GOOGLE_PING_URL = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
const BING_PING_URL = `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;

async function pingUrl(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent": "Unit Convertor Tools Sitemap Submitter/1.0",
      Accept: "text/xml,application/xml,text/plain,*/*",
    },
  });
  const body = await response.text();
  return {
    url,
    status: response.status,
    ok: response.ok,
    snippet: body.slice(0, 1024),
  };
}

async function run() {
  console.log("Submitting sitemap:", SITEMAP_URL);

  const results = [];
  const googleResult = await pingUrl(GOOGLE_PING_URL);
  console.log("Google ping status:", googleResult.status, googleResult.ok);
  results.push(googleResult);

  const bingResult = await pingUrl(BING_PING_URL);
  console.log("Bing ping status:", bingResult.status, bingResult.ok);
  results.push(bingResult);

  const logFolder = path.join(process.cwd(), "scripts", "logs");
  if (!fs.existsSync(logFolder)) {
    fs.mkdirSync(logFolder, { recursive: true });
  }

  const logPath = path.join(logFolder, `submit-sitemap-${new Date().toISOString().replace(/[:.]/g, "-")}.log`);
  const logContent = [`Sitemap submission run: ${new Date().toISOString()}`];
  results.forEach((result) => {
    logContent.push(`URL: ${result.url}`);
    logContent.push(`Status: ${result.status}`);
    logContent.push(`Success: ${result.ok}`);
    logContent.push(`Response snippet: ${result.snippet.replace(/\n/g, " ").slice(0, 300)}`);
    logContent.push("---");
  });
  fs.writeFileSync(logPath, logContent.join("\n"), "utf8");
  console.log("Sitemap ping log written to", logPath);
}

run().catch((error) => {
  console.error("Sitemap submission failed:", error);
  process.exit(1);
});
