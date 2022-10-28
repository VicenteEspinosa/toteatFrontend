import "./App.css";
import WorkerStats from "./components/WorkerStats/WorkerStats";
import PieChartProportions from "./components/PieChartProportions/PieChartProportions";
import SuspiciousTables from "./components/SuspiciousTables/SuspiciousTables";
import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Delayed = ({ children, waitBeforeShow = 500 }: Props) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true);
    }, waitBeforeShow);
    return () => clearTimeout(timer);
  }, [waitBeforeShow]);

  return isShown ? children : null;
};

function App() {
  const [serverLoaded, setServerLoaded] = useState(false);

  const pingServer = () => {
    console.log("pinging server");
    fetch(process.env.REACT_APP_BASE_URL + "/ping").then((res) =>
      setServerLoaded(true)
    );
  };

  pingServer();

  return (
    <div className="App">
      {serverLoaded ? (
        <div>
          <div className="title">Ventas sospechosas</div>
          <div className="description">
            <p>
              En esta sección se muestran las ventas en las cuales el la suma
              del precio de los productos no coincide con el total pagado,
            </p>
            <p>agrupado por cajero que recibió el pago.</p>
          </div>
          <SuspiciousTables />
          <div className="title">Estadísticas proporción</div>
          <div className="description">
            <p>
              En esta sección se muestran las proporciones de categorías de
              productos vendidos por zona,
            </p>
            <p>junto con la proporción de dinero que generaron.</p>
          </div>
          <PieChartProportions legend={true} zone={"Vip"} />
          <div className="horizontalFlex">
            <div className="pieChart">
              <PieChartProportions zone={"Salón"} />
            </div>
            <div className="pieChart">
              <PieChartProportions zone={"Terraza"} />
            </div>
          </div>
          <hr />
          <Delayed>
            <WorkerStats waiter={true} />
          </Delayed>
        </div>
      ) : (
        <ClipLoader
          color={"blue"}
          loading={true}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </div>
  );
}

export default App;
