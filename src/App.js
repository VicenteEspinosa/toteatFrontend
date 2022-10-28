import "./App.css";
import WorkerStats from "./components/WorkerStats/WorkerStats";
import PieChartProportions from "./components/PieChartProportions/PieChartProportions";

function App() {
  return (
    <div className="App">
      <div className="title">Estadísticas proporcion</div>
      <div className="description">
        <p>
          En esta sección se muestran las proporciones de categogrías de
          preductos vendidos por zona,
        </p>
        <p>junto con la proporción de dinero que generaron.</p>
      </div>
      <PieChartProportions legend={true} zone={"Vip"} />
      <hr />
      <div className="horizontalFlex">
        <div className="pieChart">
          <PieChartProportions zone={"Salón"} />
        </div>
        <div className="pieChart">
          <PieChartProportions zone={"Terraza"} />
        </div>
      </div>
      <hr />
      <WorkerStats waiter={true} />
    </div>
  );
}

export default App;
