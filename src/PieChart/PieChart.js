import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const PieChart = () => {
  const chartRef = useRef(null);
  const dataSource = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
      ],
    }],
  };

  const createChart = (dataSource) => {
    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: dataSource,
      options: {
        responsive: true,
        maintainAspectRatio: false, // Allows for custom height/width
      },
    });
  };

  const getBudget = async () => {
    try {
      const res = await axios.get('http://localhost:4000/budget');
      res.data.myBudget.forEach((item, index) => {
        dataSource.datasets[0].data[index] = item.budget;
        dataSource.labels[index] = item.title;
      });

      createChart(dataSource);
    } catch (error) {
      console.error('Error fetching budget data:', error);
    }
  };

  useEffect(() => {
    getBudget();
  }, []);

  return (
    <div className="chart-container">
      <canvas ref={chartRef} width={300} height={300} />
    </div>
  );
};

export default PieChart;
