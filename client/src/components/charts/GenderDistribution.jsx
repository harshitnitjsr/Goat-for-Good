import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GenderDistributionChart = () => {
  const data = [
    { _id: 'Male', count: 14 },
    { _id: 'Female', count: 86 }
  ];

  const chartData = {
    labels: data.map(d => d._id),
    datasets: [{
      data: data.map(d => d.count),
      backgroundColor: ['#36a2eb', '#ff6384']
    }]
  };

  return (
    <div>
      <h4>Gender Distribution of Goats</h4>
      <Pie data={chartData} width={"40px"} height={"40px"}options={{ responsive: true }}/>
    </div>
  );
};

export default GenderDistributionChart;
