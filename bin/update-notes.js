import { existsSync, readFileSync, writeFileSync } from "fs";
import { diffLines } from "diff";

function formatDate(date) {
  return getDate(date).replaceAll("-", "/");
}

function getDate(date) {
  return date.toISOString().replace(/T.+/, "");
}

const notesHistoryFolder = process.argv[2];
const dataFile = process.argv[3];

if (!notesHistoryFolder || !dataFile) {
  console.error("Notes folder and target data file must be provided.");
  process.exit(1);
}

console.log(`Updating notes from ${notesHistoryFolder} to data file ${dataFile}`);

const data = JSON.parse(readFileSync(dataFile));

const today = new Date(Date.now());
const yesterday = new Date(Date.now() - 864e5);

const yesterdaysNotes = existsSync(`./${notesHistoryFolder}/${getDate(yesterday)}.txt`)
  ? readFileSync(`./${notesHistoryFolder}/${getDate(yesterday)}.txt`, "utf8")
  : "";

const todaysNotes = readFileSync(`./${notesHistoryFolder}/${getDate(today)}.txt`, "utf8");

const diff = diffLines(todaysNotes, yesterdaysNotes);

console.log("Changes in notes:");
console.log(diff);

const count = diff
  .filter((d) => d.added || d.removed)
  .map((d) => d.count)
  .reduce((partialSum, a) => partialSum + a, 0);

console.log(`Found ${count} modified notes for ${today.toUTCString()}.`);

if (count > 0) {
  const newEntry = { date: formatDate(today), count: count - 1 };
  data.push(newEntry);

  console.log("Added new daily notes record:");
  console.log(newEntry);

  writeFileSync(dataFile, JSON.stringify(data, null, 2));
}
