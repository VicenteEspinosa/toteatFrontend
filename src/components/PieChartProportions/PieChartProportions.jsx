import React, { Component } from "react";
import {
  Chart,
  PieSeries,
  Title,
  Legend,
} from "@devexpress/dx-react-chart-bootstrap4";
import "@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css";
import style from "./PieChartProportions.module.css";

class PieChartProportions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [],
      filter: "quantity",
    };
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_BASE_URL + "/categories_by_zone")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          chartData: {
            Vip: Object.keys(data["Vip"]).map((categorie) => ({
              name: categorie,
              quantity: data["Vip"][categorie]["quantity"],
              income: data["Vip"][categorie]["income"],
            })),
            Salón: Object.keys(data["Salón"]).map((categorie) => ({
              name: categorie,
              quantity: data["Salón"][categorie]["quantity"],
              income: data["Salón"][categorie]["income"],
            })),
            Terraza: Object.keys(data["Terraza"]).map((categorie) => ({
              name: categorie,
              quantity: data["Terraza"][categorie]["quantity"],
              income: data["Terraza"][categorie]["income"],
            })),
          },
        });
      });
  }

  switchFilter = () => {
    this.setState({
      filter: this.state.filter === "quantity" ? "income" : "quantity",
    });
  };

  render() {
    const { chartData, filter } = this.state;

    return (
      <div className={style.card}>
        <button className={style.button} onClick={this.switchFilter}>
          {filter === "quantity" ? "Ver por dinero" : "Ver por cantidad"}
        </button>
        <Chart data={chartData.length === 0 ? [] : chartData[this.props.zone]}>
          <PieSeries valueField={filter} argumentField="name" />
          <div className={style.center}>
            <Title
              text={
                this.props.zone +
                `(${filter === "quantity" ? "Cantidad" : "Dinero"})`
              }
            />
          </div>
          <div className={style.legend}>
            {this.props.legend ? <Legend position={"bottom"} /> : null}
          </div>
        </Chart>
      </div>
    );
  }
}

export default PieChartProportions;
