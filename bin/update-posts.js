import { readFileSync, writeFileSync } from "fs";
import { XMLParser } from "fast-xml-parser";

function formatDate(date) {
  return date.toISOString().replace(/T.+/, "").replaceAll("-", "/");
}

async function fetchPosts(url, today) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const result = await response.text();
  const xml = new XMLParser().parse(result);

  return xml.rss.channel.item
    .map((item) => item.pubDate)
    .map((date) => new Date(date))
    .map((date) => new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())))
    .filter((date) => date.getTime() === today.getTime()).length;
}

const dataFile = process.argv[2];

if (!dataFile) {
  console.error("Target data file must be provided.");
  process.exit(1);
}

console.log(`Updating social media posts data file ${dataFile}`);

const data = JSON.parse(readFileSync(dataFile, "utf8"));

const today = new Date(Date.now());
today.setHours(0, 0, 0, 0);

const blueSkyPosts = await fetchPosts(
  "https://bsky.app/profile/did:plc:kc6lo2m2mfjzj54humjq4usg/rss",
  today,
);
const mastodonPosts = await fetchPosts("https://dice.camp/@grislyeye.rss", today);
const posts = blueSkyPosts + mastodonPosts;

console.log(
  `${blueSkyPosts} bluesky posts and ${mastodonPosts} mastodon posts found for ${today.toUTCString()}.`,
);

if (posts > 0) {
  const newEntry = { date: formatDate(today), count: posts - 1 };
  data.push(newEntry);

  console.log("Added new daily posts record:");
  console.log(newEntry);

  writeFileSync(dataFile, JSON.stringify(data, null, 2));
}
