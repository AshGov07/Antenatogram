import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

// eslint-disable-next-line react/prop-types
const MyResponsiveLine = ({ data, labels, threshold, view }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const maxDataValue = Math.max(...data);
  const maxYValue = maxDataValue + (maxDataValue * 0.25) - (maxDataValue * 0.25) % 10;

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Value',
          data: data,
          borderWidth: 2,
          tension: 0.1,
          segment: {
            borderColor: ctx => (ctx.p0.parsed.y >= threshold && ctx.p1.parsed.y >= threshold) ? 'red' : 'green',
          },
          pointBackgroundColor: ctx => ctx.raw >= threshold ? 'red' : 'green',
          pointBorderColor: ctx => ctx.raw >= threshold ? 'red' : 'green', 
          pointBorderWidth: 1, 
          pointRadius: view === 'dash'? 0:2, 
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: maxYValue,
            grid: {
              display: view === 'modal', // Show grid only in modal view
            },
            ticks: {
              display: view === 'modal', // Show ticks only in modal view
            },
          },
          x: {
            grid: {
              display: view === 'modal', // Show grid only in modal view
            },
            ticks: {
              display: view === 'modal', // Show ticks only in modal view
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.parsed.y;
                const color = value >= threshold ? 'red' : 'green';
                return `Value: ${value} (${color})`;
              }
            }
          }
        },
        maintainAspectRatio: view === 'dash' ? false : true, // Adjust aspect ratio for dash view
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, labels, threshold, view, maxYValue]);

  return (
    <div style={{ width: view === 'dash' ? '100%' : '100%', maxWidth: view === 'dash' ? '220px' : '600px' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default MyResponsiveLine;
