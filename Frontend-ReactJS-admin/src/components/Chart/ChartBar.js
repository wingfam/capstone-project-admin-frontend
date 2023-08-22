import React, { useState } from "react";
import { CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import { data } from "../data";
import Chart from "chart.js/auto";
import { FormattedMessage, useIntl } from "react-intl";
import "./ChartBar.scss";

Chart.register(CategoryScale);
function ChartBar() {
  const intl = useIntl();
  const [chartData] = useState({
    labels: data.dataMonth.map((vdata) => vdata.weekday),
    datasets: [
      {
        label: intl.formatMessage({ id: "chart.orders" }),
        data: data.dataMonth.map((vdata) => vdata.userGain),
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
        borderWidth: 1,
      },
    ],
  });
  return (
    <React.Fragment>
      <div className="chartbar-container">
        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-chart-bar">
              &nbsp; <FormattedMessage id="chart.bar-chart" />
            </i>
          </div>
          <div className="card-body">
            <div className="chartbar-content">
              <Bar
                data={chartData}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: intl.formatMessage({ id: "chart.month-chart" }),
                      font: {
                        size: 17,
                      },
                    },
                    legend: {
                      display: false,
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
        </div>
      </div>
    </React.Fragment>
  );
}

export default ChartBar;
