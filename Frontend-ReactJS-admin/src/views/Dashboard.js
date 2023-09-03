import React, { Component } from "react";
import Header from "../containers/Header/Header";
import { FormattedMessage } from "react-intl";
import ChartBar from "../components/Chart/ChartBar";
import "../styles/Dashboard.scss";
import CardFirst from "../components/CardInfo/CardFirst";
import CardSecond from "../components/CardInfo/CardSecond";
import CardThird from "../components/CardInfo/CardThird";
import { lineChartService } from "../services/dashBoard";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lineData: [],
    };
  }

  async componentDidMount() {
    await this.getDataChart();
  }

  getDataChart = async () => {
    let response = await lineChartService();
    this.setState({
      lineData: response,
    });
  };

  render() {
    return (
      <div>
        <Header data={<FormattedMessage id="title.dashboard" />} />
        <div className="row">
          <div className="col">
            <CardFirst />
          </div>
          <div className="col">
            <CardSecond />
          </div>
          <div className="col">
            <CardThird />
          </div>
        </div>
        <div className="row mt-2">
          <div className="chart-container">
            <div className="barchart-content col-md-10">
              <ChartBar />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
