import React, { useState } from "react";
import { CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { FormattedMessage, useIntl } from "react-intl";
import "./ChartBar.scss";
import axios from "axios";
import { useEffect } from "react";

Chart.register(CategoryScale);
function ChartBar() {
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

  const chartData = ({
    labels: dataChart.map((vdata) => vdata.date),
    datasets: [...new Set(dataChart.map((dataNew) => dataNew.BusinessPerDay.map((ndata) => ndata.businessName)))]
  });
  console.log(dataChart.map((vdata) => vdata.BusinessPerDay.map((ndata) => ndata.businessName)));
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
                          size: 17,
                        },
                      },
                    },
                    x: {
                      ticks: {
                        font: {
                          size: 17,
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
