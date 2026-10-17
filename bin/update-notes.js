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

const rawData = JSON.parse(readFileSync(dataFile, "utf8"))
const data = new Map(rawData.map(i => [i.date, i]))

const notes = readdirSync(notesFolder).length - 1

const today = new Date(Date.now())
const yesterday = new Date(new Date(Date.now()).setDate(today.getDate() - 1))

const previousDay = data.get(formatDate(yesterday))

if (previousDay) {
  const count = Math.abs(previousDay.total - notes)
  const newEntry = { date: formatDate(today), count: count, total: notes }
  data.set(formatDate(today), newEntry)
} else {
  const newEntry = { date: formatDate(today), count: 0, total: notes }
  data.set(formatDate(today), newEntry)
}

console.log("Added new daily record:")
console.log(data.get(formatDate(today)))

writeFileSync(dataFile, JSON.stringify(Array.from(data.values()), null, 2))
