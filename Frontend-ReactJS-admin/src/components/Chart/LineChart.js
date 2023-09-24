import React, { useState } from "react";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { FormattedMessage, useIntl } from "react-intl";
import "./LineChart.scss";
import { useEffect } from "react";
import axios from "axios";

Chart.register(CategoryScale);
function LineChart() {
  const intl = useIntl();
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://wingfam-001-site1.atempurl.com/get-business-order"
        );
        setDataChart(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const lineData = {
    labels: dataChart.map((vData) => vData.day),
    datasets: [
      {
        label: intl.formatMessage({ id: "chart.orders" }),
        data: dataChart.map((vData) => vData.amount),
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
  };

  return (
    <React.Fragment>
      <div className="linechart-container">
        <div className="card">
          <div className="card-header">
            <i className="fas fa-chart-line">
              &nbsp; <FormattedMessage id="chart.line-chart" />
            </i>
          </div>
          <div className="card-body">
            <div className="linechart-content">
              <Line
                data={lineData}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                    title: {
                      display: true,
                      text: intl.formatMessage({ id: "chart.week-chart" }),
                      font: {
                        size: 18,
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
        </div>
      </div>
    </React.Fragment>
  );
}

export default LineChart;
