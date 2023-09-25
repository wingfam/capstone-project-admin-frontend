import React, { useState } from 'react';
import { CategoryScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { data } from "../data";
import Chart from 'chart.js/auto';
import { FormattedMessage } from 'react-intl';
import "./ChartBar.scss"


Chart.register(CategoryScale);
function ChartNew() {
    const [chartData] = useState({
        labels: data.dataChart.map((vdata) => vdata.weekday),
        // datasets: data.dataChart
        datasets: [
            {
                label: "DN1",
                data: data.dataChart.map((vdata) => vdata.amount.slice(0, 1).map((a) => a.userGain).toString()),
                backgroundColor: [
                    "#CD853F"
                ],
                borderColor: "black",
                borderWidth: 2
            },
            {
                label: "DN2",
                data: data.dataChart.map((vdata) => vdata.amount.slice(1, 2).map((a) => a.userGain).toString()),
                backgroundColor: [
                    "#50AF95"
                ],
                borderColor: "black",
                borderWidth: 2
            },
            {
                label: "DN3",
                data: data.dataChart.map((vdata) => vdata.amount.slice(2, 3).map((a) => a.userGain).toString()),
                backgroundColor: [
                    "#f3ba2f"
                ],
                borderColor: "black",
                borderWidth: 2
            },
            {
                label: "DN4",
                data: data.dataChart.map((vdata) => vdata.amount.slice(3, 4).map((a) => a.userGain).toString()),
                backgroundColor: [
                    "#2a71d0",
                ],
                borderColor: "black",
                borderWidth: 2
            },
            data.dataChart.slice(0, 1).map((vdata) => vdata.amount.map((a) => a.userGain).length).toString() === "4" ? ([{
                label: "DN5",
                data: data.dataChart.map((vdata) => vdata.amount.slice(4, 5).map((a) => a.userGain).toString()),
                backgroundColor: [
                    "#8DEEEE",
                ],
                borderColor: "black",
                borderWidth: 2
            }, {
                label: "DN6",
                data: data.dataChart.map((vdata) => vdata.amount.slice(4, 5).map((a) => a.userGain).toString()),
                backgroundColor: [
                    "#00FFFF",
                ],
                borderColor: "black",
                borderWidth: 2
            }].forEach) : "abc"
        ]
    });
    console.log(data.dataChart.slice(0, 1).map((vdata) => vdata.amount.map((a) => a.userGain).length).toString() === "4" ? [1, 4].forEach((e) => console.log(e)) : 1)
    return (
        <React.Fragment>
            <div className="chartbar-container">
                <div className='card mb-4'>
                    <div className='card-header'>
                        <i className="fas fa-chart-bar">
                            &nbsp; <FormattedMessage id="table.address" />
                        </i>
                    </div>
                    <div className='card-body'>
                        <div className='chartbar-content'>
                            <Bar
                                data={chartData}
                                options={{
                                    plugins: {
                                        title: {
                                            display: true,
                                            text: "Doanh thu trong 1 tuần"
                                        },
                                        legend: {
                                            display: true
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment >

    )


}

export default ChartNew;