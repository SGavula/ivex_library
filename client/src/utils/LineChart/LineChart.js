import React, { useState, useEffect } from 'react';
//Import chart
import { Line } from 'react-chartjs-2';


const ChartLine = ({ chartData, title }) => {
    const [ selectTitle, setSelectTitle ] = useState();
	const [ monthsData, setMonthsData ] = useState();

    const select_arrow = document.querySelector("#select-arrow");
    const options_container = document.querySelector("#options-container");

	useEffect(
		() => {
			if (chartData == false) {
				null;
			} else {
				setMonthsData(chartData[0].months);
                setSelectTitle(chartData[0].year);
			}

		},
		[ chartData ]
	);

	const handleClick = (e) => {
		chartData.map((item) => {
			if (item.year == e.target.value) {
				setMonthsData(item.months);
			}
		});

        select_arrow.classList.toggle("active-img");
        options_container.classList.toggle("active");

        setSelectTitle(e.target.value);
	};

    const toggle = () => {
        select_arrow.classList.toggle("active-img");
        options_container.classList.toggle("active");
    }

    const data = {
        labels: [
			'JAN',
			'FEB',
			'MAR',
			'APR',
			'MAY',
			'JUNE',
			'JULY',
			'AUG',
			'SEP',
			'OCT',
			'NOV',
			'DEC'
		],
        backgroundColor: 'rgb(0, 0, 0)',
        datasets: [
            {
                label: 'Počet otvorení',
                data: monthsData,
                fill: false,
                backgroundColor: 'rgb(255, 197, 15)',
                borderColor: 'rgb(96, 147, 211)',
                borderWidth: 1,
                pointBorderColor: 'rgb(255, 197, 15)'
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: "#EFF4FB",
                titleColor: "#6093D3",
                bodyColor: "#6093D3",
                padding: {
                    x: 16,
                    y: 10
                },
                displayColors: false,
            }
        },
        transitions: {
            show: {
              animations: {
                x: {
                  from: 500
                },
                y: {
                  from: 1000
                }
              }
            },
            hide: {
              animations: {
                x: {
                  to: 500
                },
                y: {
                  to: 1000
                }
              }
            }
        },
        scales: {
            x: {
                grid:{
                    color: "rgb(239, 244, 251)"
                },
                ticks: {
                    color: 'rgb(45, 64, 106)',
                    font: {
                        size: 12,
                        family: "Montserrat",
                        weight: 500
                    }
                },
            },
            y: {
                ticks: {
                    beginAtZero: true,
                    color: 'rgb(45, 64, 106)',
                    font: {
                        size: 12,
                        family: "Montserrat",
                        weight: 500
                    }
                },
                grid:{
                    display:false
                }
            },
        }
      }

	return (
		<div className="graph">
            <div className="graph-heading">
                <h1 className="text-title text-32 text-bold my-0">
                    {title}
                </h1>
                <div className="select-box-wrapper">
                    <div className="select-box">
                        <div className="selected" onClick={toggle}>
                            <span>
                                {selectTitle}
                            </span>
                            <span>
                                <img id="select-arrow" src="/icons/select-arrow.svg" alt="Select icon" />
                            </span>
                        </div>
                        <div id="options-container" className="options-container" >
                            { 
                                chartData == false ? (
                                    null
                                ): (
                                    chartData.map(item => (
                                    <div className="option" key={item.year}>
                                        <input className="radio" type="radio" id={item.year} name="year" value={item.year} onClick={handleClick} />
                                        <label htmlFor={item.year}>{item.year}</label>
                                    </div>
                                ))
                                )
                                
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="chart-wrapper">
                <div className="chart">
                    {
                        chartData == false ? (
                            null
                        ) : (
                            <Line
                                data={data}
                                options={options}
                            />
                        )
                    }
                </div>
            </div>
        </div>
	);
};

export default ChartLine;
