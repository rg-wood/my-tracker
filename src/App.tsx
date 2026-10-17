import HeatMap from '@uiw/react-heat-map';
import notes from '../data/notes.json';
import './App.css'

function App({ today }: { today: Date }) {
  const startDate = new Date(today)
  startDate.setMonth(startDate.getMonth() - 3)

  return (
    <>
      <section id="center">
        <h1>Notes</h1>
        <div>
          <HeatMap
            value={notes}
            weekLabels={['', 'Mon', '', 'Wed', '', 'Fri', '']}
            startDate={ startDate }
          />
        </div>
      </section>
    </>
  )
}

export default App
