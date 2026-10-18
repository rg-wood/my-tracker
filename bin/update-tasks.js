import { readFileSync, writeFileSync } from 'fs';

function formatDate(date) {
  return date.toISOString()
    .replace(/T.+/, '')
    .replaceAll('-', '/')
}

const tasksCompletedFile = process.argv[2]
const dataFile = process.argv[3]

if(!tasksCompletedFile || !dataFile) {
  console.error("Notes folder and target data file must be provided.")
  process.exit(1);
}

console.log(`Updating tasks from ${tasksCompletedFile} to data file ${dataFile}`)

const rawData = JSON.parse(readFileSync(dataFile, "utf8"))
const data = new Map(rawData.map(i => [i.date, i]))

const tasks = parseInt(readFileSync(tasksCompletedFile))

const today = new Date(Date.now())
const yesterday = new Date(new Date(Date.now()).setDate(today.getDate() - 1))

const previousDay = data.get(formatDate(yesterday))

if (previousDay) {
  const count = Math.abs(previousDay.total - tasks)
  const newEntry = { date: formatDate(today), count: count, total: tasks }
  data.set(formatDate(today), newEntry)
} else {
  const newEntry = { date: formatDate(today), count: tasks, total: tasks }
  data.set(formatDate(today), newEntry)
}

console.log("Added new daily tasks record:")
console.log(data.get(formatDate(today)))

writeFileSync(dataFile, JSON.stringify(Array.from(data.values()), null, 2))
