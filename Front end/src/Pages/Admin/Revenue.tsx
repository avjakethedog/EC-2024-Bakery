import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, ChartDataLabels);

const Revenue: React.FC = () => {
  // Dummy data for order status
  const orderStatusData = {
    labels: ['Completed', 'Fail', 'Canceled'],
    datasets: [
      {
        label: 'Order Status',
        data: [150, 25, 50], // Dummy data
        backgroundColor: ['#FFCE56', '#FF6384', '#36A2EB'],
      },
    ],
  };

  // Dummy data for cake popularity
  const cakePopularityData = {
    labels: ['Chocolate Cake', 'Vanilla Cake', 'Red Velvet Cake', 'Cheesecake', 'Carrot Cake'],
    datasets: [
      {
        label: 'Cake Popularity',
        data: [300, 250, 200, 150, 100], // Dummy data
        backgroundColor: ['#FFCE56', '#36A2EB', '#FF6384', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  // Dummy data for monthly revenue
  const monthlyRevenueData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Revenue by Month',
        data: [3000, 4000, 5000, 3500, 6000, 7000, 8000, 5500, 6500, 7500, 8500, 9500], // Dummy data
        backgroundColor: '#FFCE56',
        borderColor: '#36A2EB',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-8">Revenue Dashboard</h1>
        <div className="flex flex-col lg:flex-row justify-around mb-8">
          <div className="w-full lg:w-1/2 p-4">
            <h2 className="text-xl font-semibold mb-4">Order Status</h2>
            <Pie 
              data={orderStatusData} 
              options={{
                plugins: {
                  datalabels: {
                    formatter: (value, context) => {
                      const total = (context.chart.data.datasets[0].data as number[]).reduce((acc, curr) => acc + curr, 0);
                      const percentage = ((value / total) * 100).toFixed(1);
                      return `${percentage}%`;
                    },
                    color: '#fff',
                    font: {
                      weight: 'bold'
                    }
                  }
                }
              }}
            />
          </div>
          <div className="w-full lg:w-1/2 p-4">
            <h2 className="text-xl font-semibold mb-4">Cake Popularity</h2>
            <Pie 
              data={cakePopularityData} 
              options={{
                plugins: {
                  datalabels: {
                    formatter: (value, context) => {
                      const total = (context.chart.data.datasets[0].data as number[]).reduce((acc, curr) => acc + curr, 0);
                      const percentage = ((value / total) * 100).toFixed(1);
                      return `${percentage}%`;
                    },
                    color: '#fff',
                    font: {
                      weight: 'bold'
                    }
                  }
                }
              }}
            />
          </div>
        </div>
        <div className="w-full p-4">
          <h2 className="text-xl font-semibold mb-4">Monthly Revenue</h2>
          <Bar data={monthlyRevenueData} />
        </div>
      </div>
    </div>
  );
};

export default Revenue;
