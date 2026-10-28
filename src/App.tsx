import HeatMap from "@uiw/react-heat-map";
import { useEffect, useState } from "react";
import "./App.css";
import notes from "../data/notes.json";
import tasks from "../data/tasks.json";

function App({ today }: { today: Date }) {
  const startDate = new Date(today);
  startDate.setMonth(startDate.getMonth() - 3);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    if (mq.matches) {
      setDarkMode(true);
    }

    mq.addEventListener("change", (evt) => setDarkMode(evt.matches));
  }, []);

  return (
    <>
      <section id="center">
        <h1>Notes</h1>
        <div>
          <HeatMap
            value={notes}
            weekLabels={["", "Mon", "", "Wed", "", "Fri", ""]}
            startDate={startDate}
            style={darkMode ? { color: "#ffffff" } : {}}
          />
        </div>
      </section>
      <section id="center">
        <h1>Tasks</h1>
        <div>
          <HeatMap
            value={tasks}
            weekLabels={["", "Mon", "", "Wed", "", "Fri", ""]}
            startDate={startDate}
            style={darkMode ? { color: "#ffffff" } : {}}
          />
        </div>
      </section>
    </>
  );
}

export default App;
