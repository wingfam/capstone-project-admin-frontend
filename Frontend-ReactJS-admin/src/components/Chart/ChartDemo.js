import React from "react";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";
import { data } from "../data";
import Chart from "chart.js/auto";
import { FormattedMessage, injectIntl } from "react-intl";
import "./LineChart.scss";
import { Component } from "react";
import { lineChartService } from "../../services/dashBoard";

Chart.register(CategoryScale);

class ChartDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lineData: [],
    };
  }

  componentDidMount() {
    this.getDataChart();
  }

  getDataChart = () => {
    // let response = await lineChartService();
    const { intl } = this.props;
    let dataLine = this.props.data;
    // console.log("data prop:", dataLine);
    this.setState({
      lineData: {
        labels: dataLine.map((vData) => vData.day),
        datasets: [
          {
            label: intl.formatMessage({ id: "chart.orders" }),
            data: dataLine.map((vChart) => vChart.amount),
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
    // console.log(
    //   "Check Demo:",
    //   dataLine.map((vData) => vData.day)
    // );
  };
  render() {
    // const { intl } = this.props;
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
