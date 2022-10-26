import React, { Component } from "react";
import { addDotsToNumber } from "../../utils";
import Plot from "react-plotly.js";

class WaiterStats extends Component {
  constructor() {
    super();

    this.state = {
      waiters: [],
      quantityTab: true,
    };
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_BASE_URL}/sells_per_waiter`)
      .then((response) => response.json())
      .then((waiters) => this.setState({ waiters: waiters }));
  }

  switchTab = () => {
    this.setState({ quantityTab: !this.state.quantityTab });
  };

  render() {
    const { waiters } = this.state;
    return (
      <div className={"a"}>
        Waiter Stats
        {Object.keys(waiters).map((waiter) => (
          <div key={waiter}>
            <p>
              {waiter} --- {addDotsToNumber(waiters[waiter]["quantity"])} ---{" "}
              {addDotsToNumber(waiters[waiter]["income"])}
            </p>
          </div>
        ))}
        <button onClick={this.switchTab}>Switch</button>
        <Plot
          data={[
            {
              marker: { color: "red" },
            },
            {
              type: "bar",
              x: Object.keys(waiters),
              y: Object.keys(waiters).map((waiter) =>
                this.state.quantityTab
                  ? waiters[waiter]["quantity"]
                  : waiters[waiter]["income"]
              ),
            },
          ]}
          layout={{
            width: 650,
            height: 480,
            title: this.state.quantityTab
              ? "Cantidad de mesas atendidas"
              : "Valor de las mesas atendidas",
          }}
        />
      </div>
    );
  }
}

export default WaiterStats;
