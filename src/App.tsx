import MyHeatMap from "./MyHeatMap";
import { useEffect, useState } from "react";
import "./App.css";
import notes from "../data/notes.json";
import tasks from "../data/tasks.json";

function App({ today }: { today: Date }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", (evt) => setDarkMode(evt.matches));
  }, []);

  const startDate = new Date(today);
  startDate.setMonth(startDate.getMonth() - 3);

  return (
    <>
      <section id="center">
        <div>
          <MyHeatMap title="Notes" data={notes} startDate={startDate} darkMode={darkMode} />
        </div>
      </section>
      <section id="center">
        <div>
          <MyHeatMap title="Tasks" data={tasks} startDate={startDate} darkMode={darkMode} />
        </div>
      </section>
    </>
  );
}

export default App;
