import React, { Component } from "react";
import { addDotsToNumber } from "../../utils";
import Paper from '@mui/material/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

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
      .then((waiters) => this.setState({ waiters: Object.keys(waiters).map((waiter) => ({name: waiter, quantity: waiters[waiter]["quantity"], income: waiters[waiter]["income"]})) }));
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
        <Paper>
        <Chart
          data={waiters}
        >
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries
            valueField={this.state.quantityTab ? "quantity" : "income"}
            argumentField="name"
          />
          <Title text={this.state.quantityTab ? "Cantidad de mesas" : "Valor total mesas"} />
          <Animation />
        </Chart>
      </Paper>
      </div>
    );
  }
}

export default WaiterStats;
