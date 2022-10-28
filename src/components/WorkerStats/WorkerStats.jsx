import React, { Component } from "react";
import Paper from "@mui/material/Paper";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
// import { Animation } from "@devexpress/dx-react-chart";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

class WorkerStats extends Component {
  constructor() {
    super();

    this.state = {
      quantityTab: true,
      filter: NaN,
      filterOptions: ["Mesero", "Cajero", "Categoria", "Zona"],
      data: {},
    };
  }

  // purchases_by_category -- purchases_by_pay_method --- purchases_by_zone
  async componentDidMount() {
    console.log(await this.fetchData("Categoria"));
    this.setState({
      data: {
        Mesero: await this.fetchData("Mesero"),
        Cajero: await this.fetchData("Cajero"),
        Categoria: await this.fetchData("Categoria"),
        Zona: await this.fetchData("Zona"),
      },
    });
    this.setState({ filter: "Mesero" });
  }

  fetchData = async (filter) => {
    const response = await fetch(
      process.env.REACT_APP_BASE_URL + this.getUrl(filter)
    );
    const workers = await response.json();
    return Object.keys(workers).map((worker) => ({
        name: worker,
        quantity: workers[worker]["quantity"],
        income: workers[worker]["income"],
      }));
  };

  switchTab = () => {
    this.setState({ quantityTab: !this.state.quantityTab });
  };

  getUrl = (filter) => {
    switch (filter) {
      case "Mesero":
        return "/sells_per_waiter";
      case "Cajero":
        return "/sells_per_cashier";
      case "Categoria":
        return "/purchases_by_category";
      case "Zona":
        return "/purchases_by_zone";
      default:
        return "/purchases_by_waiter";
    }
  };

  setFilter = (filter) => {
    this.setState({ filter: filter["value"] });
  };

  render() {
    const { quantityTab, filter, filterOptions, data } = this.state;
    return (
      <div className={"a"}>
        <div className={"title"}>
          <h1>Estadisticas {this.props.waiter ? "Meseros" : "Cajeros"}</h1>
        </div>
        <Dropdown
          options={filterOptions}
          onChange={this.setFilter}
          value={filter}
          placeholder={filter ? "Escoge una categoría" : "Cargando..."}
        />

        <Paper>
          <Chart data={filter ? data[filter] : []}>
            <ArgumentAxis />
            <ValueAxis max={7} />

            <BarSeries
              valueField={quantityTab ? "quantity" : "income"}
              argumentField="name"
            />
            <Title
              text={quantityTab ? "Cantidad de mesas" : "Valor total mesas"}
            />
            {/* <Animation />  Esto falla a veces por alguna razon :(*/}
          </Chart>
        </Paper>
        <button onClick={this.switchTab}>
          {quantityTab ? "Ver por ingresos" : "Ver por cantidad"}
        </button>
      </div>
    );
  }
}

export default WorkerStats;
