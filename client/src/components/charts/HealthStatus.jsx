import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const HealthStatusChart = () => {
  const data = [
    { _id: 'Healthy', count: 50 },
    { _id: 'Mild', count: 30 },
    { _id: 'Severe', count: 20 }
  ];

const chartData = {
    labels: data.map(d => d._id),
    datasets: [{
        data: data.map(d => d.count),
        backgroundColor: ['#36a2eb', '#ffcd56', '#ff6384']
    }]
};

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false
};

return (
    <div>
        <h4>Health Status of Goats</h4>
        <Pie data={chartData} width={"40px"} height={"40px"}options={{ responsive: true }} />
    </div>
);
};

export default HealthStatusChart;
