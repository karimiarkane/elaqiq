"use client"
import React from 'react'
import { Doughnut, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title
  } from 'chart.js';
  
  ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Title
  );
  const DashboardStatistics = ({data} : {data: any}) => {

    const doughnutData = {
      labels: ['Présent', 'Absent', 'Congé'],
      datasets: [
        {
          data: [data.presentCount, data.absentCount, data.congeCount],
          backgroundColor: ['#4caf50', '#f44336', '#2196f3'],
        },
      ],
    };
  
    const barData = {
      labels: ['Présent', 'Absent', 'Congé'],
      datasets: [
        {
          label: 'Statistiques de présence',
          data: [data.presentCount, data.absentCount, data.congeCount],
          backgroundColor: ['#4caf50', '#f44336', '#2196f3'],
        },
      ],
    };

    const barOptions = {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1, // Adjust this value to fit your data
            },
          },
        },
      };
return (
    <div className="flex justify-evenly py-5">
         <div className='w-2/5 flex items-center'>
          
         <Bar data={barData} options={barOptions} />
        </div>
        <div className="w-2/5">
            
            <Doughnut data={doughnutData}  />
        </div>
       
    </div>
);
}

export default DashboardStatistics