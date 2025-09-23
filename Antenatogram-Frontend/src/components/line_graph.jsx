// Working code with white screen crash


// import { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';

// // eslint-disable-next-line react/prop-types
// const MyResponsiveLine = ({ data, labels, threshold, view }) => {
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);

//   const maxDataValue = Math.max(...data);
//   const maxYValue = maxDataValue + (maxDataValue * 0.25) - (maxDataValue * 0.25) % 10;

//   useEffect(() => {
//     if (chartInstance.current) {
//       chartInstance.current.destroy();
//     }

//     const ctx = chartRef.current.getContext('2d');

//     chartInstance.current = new Chart(ctx, {
//       type: 'line',
//       data: {
//         labels: labels,
//         datasets: [{
//           label: 'Value',
//           data: data,
//           borderWidth: 2,
//           tension: 0.1,
//           segment: {
//             borderColor: ctx => (ctx.p0.parsed.y >= threshold && ctx.p1.parsed.y >= threshold) ? 'red' : 'green',
//           },
//           pointBackgroundColor: ctx => ctx.raw >= threshold ? 'red' : 'green',
//           pointBorderColor: ctx => ctx.raw >= threshold ? 'red' : 'green', 
//           pointBorderWidth: 1, 
//           pointRadius: view === 'dash'? 0:2, 
//         }]
//       },
//       options: {
//         responsive: true,
//         scales: {
//           y: {
//             beginAtZero: true,
//             max: maxYValue,
//             grid: {
//               display: view === 'modal', // Show grid only in modal view
//             },
//             ticks: {
//               display: view === 'modal', // Show ticks only in modal view
//             },
//           },
//           x: {
//             grid: {
//               display: view === 'modal', // Show grid only in modal view
//             },
//             ticks: {
//               display: view === 'modal', // Show ticks only in modal view
//             },
//           },
//         },
//         plugins: {
//           legend: {
//             display: false,
//           },
//           tooltip: {
//             callbacks: {
//               label: (context) => {
//                 const value = context.parsed.y;
//                 const color = value >= threshold ? 'red' : 'green';
//                 return `Value: ${value} (${color})`;
//               }
//             }
//           }
//         },
//         maintainAspectRatio: view === 'dash' ? false : true, // Adjust aspect ratio for dash view
//       }
//     });

//     return () => {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//     };
//   }, [data, labels, threshold, view, maxYValue]);

//   return (
//     <div style={{ width: view === 'dash' ? '100%' : '100%', maxWidth: view === 'dash' ? '220px' : '600px' }}>
//       <canvas ref={chartRef} />
//     </div>
//   );
// };

// export default MyResponsiveLine;






//Perfect working code with no crash


import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

// eslint-disable-next-line react/prop-types
const MyResponsiveLine = ({ data, labels, threshold, view }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Sanitize data
  const parsedData = Array.isArray(data)
    ? data.map((d) => {
        const parsed = parseFloat(d);
        return isNaN(parsed) ? 0 : parsed;
      })
    : [];

  const parsedLabels = Array.isArray(labels) ? labels : [];

  const maxDataValue = parsedData.length > 0 ? Math.max(...parsedData) : 10;
  const maxYValue = maxDataValue + (maxDataValue * 0.25) - (maxDataValue * 0.25) % 10;

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: parsedLabels,
        datasets: [
          {
            label: 'Value',
            data: parsedData,
            borderWidth: 2,
            tension: 0.1,
            segment: {
              borderColor: (ctx) =>
                ctx.p0.parsed.y >= threshold && ctx.p1.parsed.y >= threshold
                  ? 'red'
                  : 'green',
            },
            pointBackgroundColor: (ctx) =>
              ctx.raw >= threshold ? 'red' : 'green',
            pointBorderColor: (ctx) =>
              ctx.raw >= threshold ? 'red' : 'green',
            pointBorderWidth: 1,
            pointRadius: view === 'dash' ? 0 : 2,
          },
        ],
      },
      options: {
        responsive: true,
        // scales: {
        //   y: {
        //     beginAtZero: true,
        //     max: maxYValue,
        //     grid: {
        //       display: view === 'modal',
        //     },
        //     ticks: {
        //       display: view === 'modal',
        //     },
        //   },
        //   x: {
        //     grid: {
        //       display: view === 'modal',
        //     },
        //     ticks: {
        //       display: view === 'modal',
        //     },
        //   },
        // },
        scales: {
          y: {
            beginAtZero: true,
            max: maxYValue,
            grid: {
              display: true,
            },
            ticks: {
              display: true,
              font: {
                size: view === 'dash' ? 8 : 12,
              },
            },
            title: {
              display: true,
              text: 'Value',
              font: {
                size: view === 'dash' ? 8 : 14,
              },
            },
          },
          x: {
            grid: {
              display: true,
            },
            ticks: {
              display: true,
              font: {
                size: view === 'dash' ? 8 : 12,
              },
            },
            title: {
              display: true,
              text: 'Date',
              font: {
                size: view === 'dash' ? 8 : 14,
              },
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
              },
            },
          },
        },
        maintainAspectRatio: view === 'dash' ? false : true,
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [parsedData, parsedLabels, threshold, view, maxYValue]);

  return (
    <div
      style={{
        width: view === 'dash' ? '100%' : '100%',
        maxWidth: view === 'dash' ? '220px' : '600px',
      }}
    >
      <canvas ref={chartRef} />
    </div>
  );
};

export default MyResponsiveLine;





// import { useEffect, useRef } from "react";
// import Chart from "chart.js/auto";

// // eslint-disable-next-line react/prop-types
// const MyResponsiveLine = ({ data, labels, threshold, view, id }) => {
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);

//   // Support single or twin mode
//   // If `data` is an object like { babyA: [...], babyB: [...] } → twin
//   // If `data` is a simple array → single
//   const isTwin = data && typeof data === "object" && data.babyA && data.babyB;

//   const parsedLabels = Array.isArray(labels) ? labels : [];

//   // Find max Y
//   let maxDataValue = 10;
//   if (isTwin) {
//     const allVals = [...data.babyA, ...data.babyB].map((d) => parseFloat(d));
//     maxDataValue = allVals.length > 0 ? Math.max(...allVals) : 10;
//   } else {
//     const arr = Array.isArray(data) ? data : [];
//     const allVals = arr.map((d) => parseFloat(d));
//     maxDataValue = allVals.length > 0 ? Math.max(...allVals) : 10;
//   }
//   const maxYValue =
//     maxDataValue + (maxDataValue * 0.25) - ((maxDataValue * 0.25) % 10);

//   useEffect(() => {
//     if (chartInstance.current) {
//       chartInstance.current.destroy();
//     }

//     const ctx = chartRef.current.getContext("2d");

//     // Build datasets
//     let datasets = [];

//     if (isTwin) {
//       datasets = [
//         {
//           label: "Baby A",
//           data: data.babyA.map((d) => parseFloat(d)),
//           borderColor: "blue",
//           backgroundColor: "blue",
//           borderWidth: 2,
//           tension: 0.1,
//           pointBackgroundColor: "blue",
//           pointBorderColor: "blue",
//           pointRadius: view === "dash" ? 0 : 2,
//         },
//         {
//           label: "Baby B",
//           data: data.babyB.map((d) => parseFloat(d)),
//           borderColor: "orange",
//           backgroundColor: "orange",
//           borderWidth: 2,
//           tension: 0.1,
//           pointBackgroundColor: "orange",
//           pointBorderColor: "orange",
//           pointRadius: view === "dash" ? 0 : 2,
//         },
//       ];
//     } else {
//       datasets = [
//         {
//           label: id || "Value",
//           data: Array.isArray(data)
//             ? data.map((d) => parseFloat(d))
//             : [],
//           borderWidth: 2,
//           tension: 0.1,
//           segment: {
//             borderColor: (ctx) =>
//               ctx.p0.parsed.y >= threshold && ctx.p1.parsed.y >= threshold
//                 ? "red"
//                 : "green",
//           },
//           pointBackgroundColor: (ctx) =>
//             ctx.raw >= threshold ? "red" : "green",
//           pointBorderColor: (ctx) =>
//             ctx.raw >= threshold ? "red" : "green",
//           pointBorderWidth: 1,
//           pointRadius: view === "dash" ? 0 : 2,
//         },
//       ];
//     }

//     chartInstance.current = new Chart(ctx, {
//       type: "line",
//       data: {
//         labels: parsedLabels,
//         datasets,
//       },
//       options: {
//         responsive: true,
//         scales: {
//           y: {
//             beginAtZero: true,
//             max: maxYValue,
//             grid: { display: true },
//             ticks: {
//               display: true,
//               font: { size: view === "dash" ? 8 : 12 },
//             },
//             title: {
//               display: true,
//               text: "Value",
//               font: { size: view === "dash" ? 8 : 14 },
//             },
//           },
//           x: {
//             grid: { display: true },
//             ticks: {
//               display: true,
//               font: { size: view === "dash" ? 8 : 12 },
//             },
//             title: {
//               display: true,
//               text: "Date",
//               font: { size: view === "dash" ? 8 : 14 },
//             },
//           },
//         },
//         plugins: {
//           legend: {
//             display: true, // ✅ Show Baby A/B labels
//           },
//           tooltip: {
//             callbacks: {
//               label: (context) => `${context.dataset.label}: ${context.parsed.y}`,
//             },
//           },
//         },
//         maintainAspectRatio: view === "dash" ? false : true,
//       },
//     });

//     return () => {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//     };
//   }, [data, parsedLabels, threshold, view, maxYValue, id, isTwin]);

//   return (
//     <div
//       style={{
//         width: view === "dash" ? "100%" : "100%",
//         maxWidth: view === "dash" ? "220px" : "600px",
//       }}
//     >
//       <canvas ref={chartRef} />
//     </div>
//   );
// };

// export default MyResponsiveLine;
