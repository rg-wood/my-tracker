import HeatMap from '@uiw/react-heat-map';
import notes from '../data/notes.json';
import './App.css'

function App() {
  const startDate = new Date(Date.now())
  startDate.setMonth(startDate.getMonth() - 3)

  return (
    <>
      <section id="center">
        <h1>Notes</h1>
        <div>
          <HeatMap
            value={notes}
            weekLabels={['', 'Mon', '', 'Wed', '', 'Fri', '']}
            startDate={startDate}
          />
        </div>
      </section>
    </>
  )
}

export default App
