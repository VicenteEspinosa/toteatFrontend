import React, { Component } from "react";
import Paper from "@mui/material/Paper";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";
import { EventTracker } from "@devexpress/dx-react-chart";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import style from "./WorkerStats.module.css";

class WorkerStats extends Component {
  constructor() {
    super();

    this.state = {
      quantityTab: true,
      filter: NaN,
      filterOptions: ["Cajero", "Categoria", "Mesero", "Zona"],
      data: {},
    };
  }

  async componentDidMount() {
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
      <div className={"general"}>
        <div className={"title"}>
          <h1>Estadisticas Cantidad</h1>
        </div>
        <div className="description">
          <p>
            En esta sección se muestran las cantidad de mesas o dinero,
            organizado por un filtro seleccionado.
          </p>
        </div>
        <div className={style.filter}>
          <Dropdown
            options={filterOptions}
            onChange={this.setFilter}
            value={filter}
            placeholder={filter ? "Escoge una categoría" : "Cargando..."}
          />
          <button className={style.button} onClick={this.switchTab}>
            {quantityTab ? "Ver por ingresos" : "Ver por mesas"}
          </button>
        </div>

        <Paper>
          <Chart data={filter ? data[filter] : []}>
            <ArgumentAxis />
            <ValueAxis max={7} />

            <BarSeries
              color={quantityTab ? "#3f51b5" : "#12bb48"}
              valueField={quantityTab ? "quantity" : "income"}
              argumentField="name"
            />
            <Title
              text={
                quantityTab ? "Cantidad de mesas" : "Valor total de las mesas"
              }
            />
            <EventTracker />
            <Tooltip />
          </Chart>
        </Paper>
      </div>
    );
  }
}

export default WorkerStats;
