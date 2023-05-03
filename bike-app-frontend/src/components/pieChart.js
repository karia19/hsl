import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ( props ) => {
    
    const data = {
        labels: ["departureMaxDistance" ,"departureMeanDistance","departureMeanDuration","departureMeanSpeed"],
        options: [{
            maintainAspectRatio: false,
            scales: {
                yAxes:{
                    grid: {
                        drawBorder: true,
                        color: '#FFFFFF',
                    },
                    ticks:{
                        beginAtZero: true,
                        color: 'white',
                        fontSize: 12,
                    }
                },
                xAxes: {
                    grid: {
                        drawBorder: true,
                        color: '#FFFFFF',
                    },
                    ticks:{
                        beginAtZero: true,
                        color: 'white',
                        fontSize: 12,
                    }
                },
            }
        }],
        datasets: [
            {
                data: [props.data.departureMaxDistance,  props.data.departureMeanDistance, props.data.departureMeanDuration, props.data.departureMeanSpeed ],
                backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235)',
                    'rgba(255, 206, 86)',
                    'rgba(75, 192, 192)',
                    'rgba(153, 102, 255)',
                
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                
                ],
                borderWidth: 1,
                
            },
        ],  
    }   
    const data2 = {
        labels: ["returnMaxDistance" ,"returnMeanDistance","returnMeanDuration","returnMeanSpeed"],
        datasets: [
            {
                data: [props.data.returnMaxDistance,  props.data.returnMeanDistance, props.data.returnMeanDuration, props.data.returnMeanSpeed],
                backgroundColor: [
                    'rgb(136, 111, 97)',
                    'rgba(22, 12, 235)',
                    'rgba(255, 100, 86)',
                    'rgba(75, 111, 192)',
                    'rgba(223, 223, 80)',
                
                ],

                borderWidth: 0,
            },
        ],  

    }
    
    return (
        <div className="container">
        <div className="row" style={{ color: "white",}}>
            <div className="col-6">
                <Pie data={data} />
                <div className="text-center" style={{ marginTop: "1.3rem"}}>
                    <p>Departures: {props.data.departureResults} kpl</p>
                    <p>Max Duration: {(props.data.departureMaxDuration).toFixed(2)} min</p>
                </div>
            </div>

            <div className="col-6">
                <Pie data={data2} />
                <div className="text-center" style={{ marginTop: "1.3rem"}}>
                    <p>Returns: {props.data.retrunResults} kpl</p>
                    <p>Max Duration: {(props.data.returnMaxDuration).toFixed(2)} min</p>
                </div>
            </div>
        </div>
        </div>
    )
}

export default PieChart;
