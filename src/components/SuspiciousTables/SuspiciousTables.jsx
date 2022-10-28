import React, { Component } from "react";
import Paper from "@mui/material/Paper";
import { GroupingState, IntegratedGrouping } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableGroupRow,
} from "@devexpress/dx-react-grid-material-ui";

const columns = [
  { name: "cashier", title: "Cajero" },
  { name: "waiter", title: "Mesero" },
  { name: "zone", title: "Zona" },
  { name: "missing_money", title: "Dinero faltante" },
  { name: "date_opened", title: "Fecha Abierto" },
  { name: "date_closed", title: "Fecha Cierre" },

];

const rows = [
  {
    cashier: "Cajero 1",
    waiter: "Mesero 1",
    zone: "Zona 1",
    missing_money: 1000,
  },
  {
    cashier: "Cajero 1",
    waiter: "Mesero 1",
    zone: "Zona 2",
    missing_money: 2000,
  },
  {
    cashier: "Cajero 1",
    waiter: "Mesero 2",
    zone: "Zona 1",
    missing_money: 3000,
  },
];

class SuspiciousTables extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
    };
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_BASE_URL + "/missing_money")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          tableData: data,
        });
      });
  }

  render() {
    const { tableData } = this.state;

    return (
      <div>
        <Paper>
          <Grid rows={tableData} columns={columns}>
            <GroupingState grouping={[{ columnName: "cashier" }]} />
            <IntegratedGrouping />
            <Table />
            <TableHeaderRow />
            <TableGroupRow />
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default SuspiciousTables;
