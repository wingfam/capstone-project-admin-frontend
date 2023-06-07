import React, { Component } from "react";
import Header from "../containers/Header/Header";
import { FormattedMessage } from "react-intl";
import ChartBar from "../components/Chart/ChartBar";
import LineChart from "../components/Chart/LineChart";
import "../styles/Dashboard.scss"
import CardFirst from "../components/CardInfo/CardFirst";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header data={<FormattedMessage id="title.dashboard" />} />
        <div className="row">
          <div className="col">
            <CardFirst />
          </div>
          <div className="col">
            <CardFirst />
          </div>
          <div className="col">
            <CardFirst />
          </div>
          <div className="col">
            <CardFirst />
          </div>
        </div>
        <div className="row mt-5">
          <div className="chart-container">
            <div className="barchart-content col-md-6">
              <ChartBar />
            </div>
            <div className="linechart-content col-md-6">
              <LineChart />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Dashboard;
