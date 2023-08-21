import React, { useState } from "react";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";
import { data } from "../data";
import Chart from "chart.js/auto";
import { FormattedMessage, useIntl } from "react-intl";
import "./LineChart.scss";
import { useEffect } from "react";
import { lineChartService } from "../../services/dashBoard";
import axios from "axios";

Chart.register(CategoryScale);
function LineChart() {
  const intl = useIntl();
  const [loading, setLoading] = useState(true);
  const [dataChart1, setDataChart] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "https://localhost:44302/get-line-char"
        );
        setDataChart(response);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  //   var url = "https://localhost:44302/get-line-char";
  //    axios.get(url).then((res) => {
  //     setDataChart(res.data);
  //     console.log("Check:", dataChart1);
  //   });
  // },[dataChart1]);
  const [lineData] = useState({
    labels: data.dataChart.map((vdata) => vdata.weekday),
    datasets: [
      {
        label: intl.formatMessage({ id: "chart.orders" }),
        data: data.dataChart.map((vdata) => vdata.userGain),
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
  });
  console.log("Check:", data.dataChart, dataChart1);
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
        </div>
      </div>
    </React.Fragment>
  );
}

export default LineChart;
