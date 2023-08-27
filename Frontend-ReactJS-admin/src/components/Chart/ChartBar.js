import React, { useState } from "react";
import { CategoryScale } from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { FormattedMessage, useIntl } from "react-intl";
import "./ChartBar.scss";
import axios from "axios";
import { useEffect } from "react";

Chart.register(CategoryScale);
function ChartBar() {
  const intl = useIntl();
  const [dataChart, setDataChart] = useState([]);
  const [businessName, setBusinessName] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44302/get-business-order"
        );
        setDataChart(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataName = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44302/api/v1/business/get-all"
        );
        setBusinessName(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDataName();
  }, []);
  // const [arrFirst] = 
  // const [arrSecond] = 


  const chartData = ({
    labels: dataChart.map((vdata) => vdata.date),
    datasets: [
      {
        label: [...new Set(dataChart.map((vdata) => vdata.business_1_name))],
        data: dataChart.map((vdata) => vdata.business_1_amount),
        backgroundColor: [
          "#CD853F",
        ],
        borderColor: "black",
        borderWidth: 2,
      }, {
        label: [...new Set(dataChart.map((vdata) => vdata.business_2_name))],
        data: dataChart.map((vdata) => vdata.business_2_amount),
        backgroundColor: [
          "#50AF95",
        ],
        borderColor: "black",
        borderWidth: 2,
      }
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
                      text: intl.formatMessage({ id: "chart.week-chart" }),
                      font: {
                        size: 17,
                      },
                    },
                    legend: {
                      display: true,
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

              {/* <Line
                data={chartData}
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
              /> */}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ChartBar;
