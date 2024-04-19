import { convertToPercentValue } from "../../../../constants/constants";
import { DARK_MODE, LIGHT_MODE } from "../../../../constants/theme";

export const createDataAndOptionsForPieChart = (
    label: string,
    labels: string[],
    data: number[],
    bgColors: string[],
    borderColors: string[],
    isDarkMode:boolean
  ) => {
    const SHORT = 4
    const isDataShort = data.length<=SHORT
    const pieChartData = {
      labels: labels,
      datasets: [
        {
          label: label,
          data: data,
          backgroundColor: bgColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    };

    const options:any = { //eslint-disable-line
      plugins: {
        legend: {
          display: false,
        },
        datalabels: {
          formatter: (value: any, { chart }: { chart: any }) => //eslint-disable-line
            convertToPercentValue(value, chart.data.datasets[0].data),  
          color: isDarkMode
? DARK_MODE.fontColor
: LIGHT_MODE.fontColor,
          font: {
            weight: 600,
            size:isDataShort
? 11 //eslint-disable-line
: 9 //eslint-disable-line
          },
          align:"start",
          offset:isDataShort
?-35 //eslint-disable-line
: -55 //eslint-disable-line
        },
        tooltip: {
          enabled: true,
          callbacks: {
            label: (tooltipItem: any) => { //eslint-disable-line
              const { dataset, raw } = tooltipItem;
              return `${dataset.label}: ${raw}  (${convertToPercentValue(raw, dataset.data)})`;
            },
          },
        },
      },
    };
    return { pieChartData, options };
  };