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

const data = JSON.parse(readFileSync(dataFile, "utf8"))

const today = new Date(Date.now())
const tasks = parseInt(readFileSync(tasksCompletedFile))

console.log(`${tasks} completed tasks found for ${today.toUTCString()}.`)

if (tasks > 0) {
  const newEntry = { date: formatDate(today), count: tasks - 1 }
  data.push(newEntry)

  console.log("Added new daily tasks record:")
  console.log(newEntry)

  writeFileSync(dataFile, JSON.stringify(data, null, 2))
}
