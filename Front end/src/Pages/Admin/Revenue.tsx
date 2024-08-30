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
    <div className="min-vh-100 bg-light p-4">
      <div className="container">
        <h1 className="display-4 mb-4">Revenue Dashboard</h1>
        <div className="row mb-4">
          <div className="col-lg-6 mb-4">
            <h2 className="h5 mb-3">Order Status</h2>
            <div className="bg-white p-4 rounded shadow-sm">
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
          </div>
          <div className="col-lg-6 mb-4">
            <h2 className="h5 mb-3">Cake Popularity</h2>
            <div className="bg-white p-4 rounded shadow-sm">
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
        </div>
        <div className="bg-white p-4 rounded shadow-sm">
          <h2 className="h5 mb-3">Monthly Revenue</h2>
          <Bar data={monthlyRevenueData} />
        </div>
      </div>
    </div>
  );
};

export default Revenue;
