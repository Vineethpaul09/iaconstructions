#!/usr/bin/env node
/**
 * IndexNow URL Submission Script
 * Usage: node scripts/submit-indexnow.mjs [url1] [url2] ...
 * If no URLs provided, submits all sitemap URLs.
 */

const INDEXNOW_KEY = "5447881caec34434a39666ad33b003e9";
const HOST = "iaconstructions.com";
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

const DEFAULT_URLS = [
  `https://${HOST}/`,
  `https://${HOST}/projects`,
  `https://${HOST}/services`,
  `https://${HOST}/about`,
  `https://${HOST}/contact`,
  `https://${HOST}/client-stories`,
  `https://${HOST}/properties`,
  `https://${HOST}/privacy`,
  `https://${HOST}/terms`,
  `https://${HOST}/rera`,
];

async function submitToIndexNow(urls) {
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  const endpoints = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
    "https://yandex.com/indexnow",
  ];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload),
      });
      console.log(`${endpoint}: ${res.status} ${res.statusText}`);
    } catch (err) {
      console.error(`${endpoint}: FAILED -`, err.message);
    }
  }
}

const customUrls = process.argv.slice(2);
const urls = customUrls.length > 0 ? customUrls : DEFAULT_URLS;

console.log(`Submitting ${urls.length} URLs to IndexNow...`);
submitToIndexNow(urls).then(() => console.log("Done."));
