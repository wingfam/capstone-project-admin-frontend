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
  const [businessName, setBusinessName] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://wingfam-001-site1.atempurl.com/api/v1/business/get-all"
        );
        setBusinessName(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const chartData = {
    labels: dataChart.map((vdata) => vdata.date),

    datasets: [
      // businessName.forEach((item) => [
      //   {
      //     label: businessName
      //       .slice(item, item + 1)
      //       .map((name) => name.businessName),
      //     data: dataChart.map(
      //       (dataAmount) => dataAmount.BusinessPerDay[item].businessAmount
      //     ),
      //     backgroundColor: ["#50AF95"],
      //     borderColor: "black",
      //     borderWidth: 2,
      //   },
      // ]),
      {
        label: businessName.slice(0, 1).map((name) => name.businessName),
        data: dataChart.map(
          (dataAmount) => dataAmount.BusinessPerDay[0].businessAmount
        ),
        backgroundColor: ["#50AF95"],
        borderColor: "black",
        borderWidth: 2,
      },
      {
        label: businessName.slice(1, 2).map((name) => name.businessName),
        data: dataChart.map(
          (dataAmount) => dataAmount.BusinessPerDay[1].businessAmount
        ),
        backgroundColor: ["#CD853F"],
        borderColor: "black",
        borderWidth: 2,
      },
      {
        label: businessName.slice(2, 3).map((name) => name.businessName),
        data: dataChart.map(
          (dataAmount) => dataAmount.BusinessPerDay[2].businessAmount
        ),
        backgroundColor: ["#f3ba2f"],
        borderColor: "black",
        borderWidth: 2,
      },
      {
        label: businessName.slice(3, 4).map((name) => name.businessName),
        data: dataChart.map((data) =>
          data.BusinessPerDay.slice(3, 4)
            .map((amount) => amount.businessAmount)
            .toString()
        ),
        backgroundColor: ["#d9a24"],
        borderColor: "black",
        borderWidth: 2,
      },
      {
        label: businessName.slice(4, 5).map((name) => name.businessName),
        data: dataChart.map((data) =>
          data.BusinessPerDay.slice(4, 5)
            .map((amount) => amount.businessAmount)
            .toString()
        ),
        backgroundColor:
          businessName.slice(4, 5).map((name) => name.businessName).length === 0
            ? ["white"]
            : ["#2a71d0"],
        borderColor:
          businessName.slice(4, 5).map((name) => name.businessName).length === 0
            ? ["white"]
            : "black",
        borderWidth:
          businessName.slice(4, 5).map((name) => name.businessName).length === 0
            ? 2
            : 0,
      },
      {
        label: businessName.slice(5, 6).map((name) => name.businessName),
        data: dataChart.map((data) =>
          data.BusinessPerDay.slice(5, 6)
            .map((amount) => amount.businessAmount)
            .toString()
        ),
        backgroundColor:
          businessName.slice(4, 5).map((name) => name.businessName).length === 0
            ? ["white"]
            : ["#6519cf"],
        borderColor:
          businessName.slice(4, 5).map((name) => name.businessName).length === 0
            ? ["white"]
            : "black",
        borderWidth:
          businessName.slice(4, 5).map((name) => name.businessName).length === 0
            ? 2
            : 0,
      },
    ],
  };
  // businessName.forEach((index) => console.log(index));
  console.log(chartData.datasets);
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
                      labels: {
                        font: {
                          size: 17,
                        },
                      },
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
