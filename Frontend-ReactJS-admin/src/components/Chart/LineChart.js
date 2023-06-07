import React, { useState } from 'react';
import { CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { data } from "../data";
import Chart from 'chart.js/auto';
import { FormattedMessage } from 'react-intl';
import "./LineChart.scss"


Chart.register(CategoryScale);
function LineChart() {
    const [lineData] = useState({
        labels: data.dataChart.map((vdata) => vdata.weekday),
        datasets: [
            {
                label: "Doanh thu(VND)",
                data: data.dataChart.map((vdata) => vdata.userGain),
                backgroundColor: [
                    "#CD853F",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0",
                    "#836FFF",
                    "#00FFFF",
                    "#8DEEEE"
                ],
                borderColor: "black",
                borderWidth: 2
            }]
    });
    return (
        <React.Fragment>
            <div className='linechart-container'>
                <div className='card'>
                    <div className='card-header'>
                        <i className="fas fa-chart-line">
                            &nbsp; <FormattedMessage id="table.address" />
                        </i>
                    </div>
                    <div className='card-body'>
                        <div className="linechart-content">
                            <Line
                                data={lineData}
                                options={{
                                    plugins: {
                                        title: {
                                            display: true,
                                            text: "Doanh thu trong 1 tuần"
                                        },
                                        legend: {
                                            display: false
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>

    )


}

export default LineChart;
