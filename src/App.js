import "./App.css";
import WorkerStats from "./components/WorkerStats/WorkerStats";

function App() {
  return (
    <div className="App">
      <WorkerStats waiter={true} />
    </div>
  );
}

export default App;
