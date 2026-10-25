import { readdirSync, readFileSync, writeFileSync } from 'fs';

function formatDate(date) {
  return date.toISOString()
    .replace(/T.+/, '')
    .replaceAll('-', '/')
}

const notesFolder = process.argv[2]
const dataFile = process.argv[3]

if(!notesFolder || !dataFile) {
  console.error("Notes folder and target data file must be provided.")
  process.exit(1);
}

console.log(`Updating notes from ${notesFolder} to data file ${dataFile}`)

const data = JSON.parse(readFileSync(dataFile, "utf8"))

const notes   = readdirSync(notesFolder).length - 1
const today   = new Date(Date.now())
const lastDay = data.slice(-1)[0]
const count   = Math.abs(lastDay.total - notes)

console.log(`Found ${count} modified notes for ${today.toUTCString()}.`)

if (count > 0) {
  const newEntry = { date: formatDate(today), count: count, total: notes }
  data.push(newEntry)

  console.log("Added new daily notes record:")
  console.log(newEntry)

  writeFileSync(dataFile, JSON.stringify(data, null, 2))
}
