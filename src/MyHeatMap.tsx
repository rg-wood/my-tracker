import HeatMap from "@uiw/react-heat-map";

function MyHeatMap({
  data,
  startDate,
  darkMode,
  title,
}: {
  data: any[];
  startDate: Date;
  darkMode: boolean;
  title: string;
}) {
  return (
    <>
      <h2>{title}</h2>
      <div>
        <HeatMap
          value={data}
          weekLabels={["", "Mon", "", "Wed", "", "Fri", ""]}
          startDate={startDate}
          style={darkMode ? { color: "#ffffff" } : {}}
        />
      </div>
    </>
  );
}

export default MyHeatMap;
