import React, { useState } from "react";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";
import { data } from "../data";
import Chart from "chart.js/auto";
import { FormattedMessage, injectIntl } from "react-intl";
import "./LineChart.scss";
// import { useEffect } from "react";
// // import { lineChartService } from "../../services/dashBoard";
// import axios from "axios";
// import { render } from "node-sass";
import { Component } from "react";
import { lineChartService } from "../../services/dashBoard";
import axios from "axios";
// import DataChart, { dataChart } from "../data/DataChart";

Chart.register(CategoryScale);

class ChartDemo extends Component {
  async componentDidMount() {
    // await this.getDataChart();
    this.state = { dataChart: [] };
    let response = await axios.get("https://localhost:44302/get-line-char");

    this.setState({
      dataChart: response.data,
    });

    const { intl } = this.props;
    this.setState({
      lineData: {
        labels: data.dataLine.map((vData) => vData.day),
        datasets: [
          {
            label: intl.formatMessage({ id: "chart.orders" }),
            data: data.dataLine.map((vChart) => vChart.amount),
            backgroundColor: [
              "#CD853F",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
              "#836FFF",
              "#00FFFF",
              "#8DEEEE",
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      },
    });
    // console.log("Check Demo:", this.state.lineData);
  }



  //   getDataChart = async () => {
  //     this.state = { lineData: [] };
  //     let response = await lineChartService();
  //     const { intl } = this.props;
  //     this.setState({
  //       lineData: {
  //         labels: response.map((vData) => vData.day),
  //         datasets: [
  //           {
  //             label: intl.formatMessage({ id: "chart.orders" }),
  //             data: response.map((vChart) => vChart.amount),
  //             backgroundColor: [
  //               "#CD853F",
  //               "#50AF95",
  //               "#f3ba2f",
  //               "#2a71d0",
  //               "#836FFF",
  //               "#00FFFF",
  //               "#8DEEEE",
  //             ],
  //             borderColor: "black",
  //             borderWidth: 2,
  //           },
  //         ],
  //       },
  //     });
  //     console.log("Check Demo:", this.state.lineData);
  //   };
  //   console.log("Check:", data.dataChart, dataChart1);
  render() {
    const { intl } = this.props;
    return (
      <React.Fragment>
        <div className="linechart-container">
          {/* <div className="card">
            <div className="card-header">
              <i className="fas fa-chart-line">
                &nbsp; <FormattedMessage id="chart.line-chart" />
              </i>
            </div>
            <div className="card-body">
              <div className="linechart-content">
                <Line
                  data={this.state.lineData}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                      },
                      title: {
                        display: true,
                        text: intl.formatMessage({ id: "chart.week-chart" }),
                        font: {
                          size: 17,
                        },
                      },
                    },
                    scales: {
                      y: {
                        ticks: {
                          font: {
                            size: 15,
                          },
                        },
                      },
                      x: {
                        ticks: {
                          font: {
                            size: 15,
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div> */}
        </div>
      </React.Fragment>
    );
  }
}

export default injectIntl(ChartDemo);
