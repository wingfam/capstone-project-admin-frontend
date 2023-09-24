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
      businessName.length >= 2
        ? [
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
              backgroundColor: ["#2a71d0"],
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
              backgroundColor: ["#6519cf"],
              borderColor: "black",
              borderWidth: 2,
            },
            {
              label: businessName.slice(5, 6).map((name) => name.businessName),
              data: dataChart.map((data) =>
                data.BusinessPerDay.slice(5, 6)
                  .map((amount) => amount.businessAmount)
                  .toString()
              ),
              backgroundColor: ["#d9a24"],
              borderColor: "white",
              borderWidth: 1,
            },
          ]
        : { label: "", backgroundColor: "white" },
    ],
  };
  console.log(businessName.length >= 2 ? "a" : "b");
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
