import { Bar } from 'react-chartjs-2';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';

import { convertToPercentValue } from '../../../../../constants/constants';
import { DARK_MODE, LIGHT_MODE } from '../../../../../constants/theme';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
export const createDataAndOptionsForBarChart = (info: number[], isDarkMode: boolean) => {
  const options = {
    scales: {
      y: {
        ticks: { color: isDarkMode
? DARK_MODE.fontColor
: LIGHT_MODE.fontColor },
      },
      x: {
        ticks: {
          color: isDarkMode
? DARK_MODE.fontColor
: LIGHT_MODE.fontColor,
          beginAtZero: true,
        },
      },
    },
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      datalabels: {
        formatter: (value: any) => { //eslint-disable-line
           
          if (value === 0) return '';
          return value;
        },
        color: isDarkMode
? DARK_MODE.fontColor
: LIGHT_MODE.fontColor,
      },
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (tooltipItem: any) => { //eslint-disable-line 
             

            const { dataset, raw } = tooltipItem;
            return `(${convertToPercentValue(raw, dataset.data)})`;
          },
        },
      },
    },
  };

  const labels = ['Successess', 'Chances', 'Not doable'];

  const data = {
    labels,
    datasets: [
      {
        label: 'chances',
        data: info,
        borderColor: ['rgb(98, 162, 56)', 'rgb(53, 162, 235)', 'rgb(255, 99, 132)'],
        backgroundColor: [
          'rgba(13, 180, 32, 0.5)',
          'rgba(53, 162, 235, 0.5)',
          'rgba(255, 99, 132, 0.5)',
        ],
      },
    ],
  };
  return { data, options };
};

export const BarChartStats = ({ settings }: { settings: any }) => { //eslint-disable-line
   
  const { data, options } = settings;
  return <Bar data={data} options={options} />;
};
