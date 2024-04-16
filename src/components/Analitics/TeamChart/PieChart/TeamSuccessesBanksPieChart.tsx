import { Pie } from 'react-chartjs-2';
import { Flex } from '@chakra-ui/react';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { FinalizedRecord } from '../../../../api/queries/useGetFinalizedfromSupabase';
import {
  POLISH_BANKS_LOGOS_COLORS_ARR,
} from '../../../../constants/constants';

import { BankFinalizedPieChartLegendElement } from './BankFinalizedPieChartLegendElement';
import { createDataAndOptionsForPieChart } from './pieChartHelpers';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface BankData {
  [key: string]: number;
}

type ArrOfLabelsAndSettings = [string,{backgroundColor:string,borderColor:string,logo:string},number]

export const TeamSuccessesBanksPieChart = ({ data }: { data: FinalizedRecord[] }) => {
 
  const bankData: BankData = data.reduce(
    (acc: BankData, curr: { bank: string; loanAmount: number }) => {
      const { bank, loanAmount } = curr;

      if (acc[bank]) {
        acc[bank] += loanAmount;
      } else {
        acc[bank] = loanAmount;
      }

      return acc;
    },
    {},
  );

  const sortedBankData = Object.entries(bankData)
    .map(([bank, value]) => ({ bank, value }))
    .sort((a, b) => b.value - a.value);

  const arrOfValues: number[] = sortedBankData.map((item) => item.value);
  const arrOfLabels: string[] = sortedBankData.map((item) => item.bank);

  const arrOfLabelsAndSettings: ArrOfLabelsAndSettings[] = arrOfLabels.map((label) => {
    const labelsWithSettings = POLISH_BANKS_LOGOS_COLORS_ARR.find(([bank]) => bank === label);
    if (labelsWithSettings) {
      const [bank, settings] = labelsWithSettings;
      return [bank, settings, arrOfValues[arrOfLabels.indexOf(label)]]
    }
    return ['', { logo: '', backgroundColor: '', borderColor: '' }, 0];  
  });

  const arrOfBgColors = arrOfLabelsAndSettings.map(([_, obj]) => obj.backgroundColor); //eslint-disable-line
  const arrOfBorderColors = arrOfLabelsAndSettings.map(([_, obj]) => obj.borderColor); //eslint-disable-line

  const { options, pieChartData } = createDataAndOptionsForPieChart(
    'total volume',
    arrOfLabels,
    arrOfValues,
    arrOfBgColors,
    arrOfBorderColors,
  );

  return (
    <Flex flexDirection={"column"}>
    <Flex >
      <Pie data={pieChartData} options={options} />
    </Flex>
    <Flex flexDirection={"column"} gap={'5px'} pl="20px">
    {arrOfLabelsAndSettings.map(([label, obj, value]) => (
        <BankFinalizedPieChartLegendElement key={label} settings={{ label, obj, value }} />
      ))}
    </Flex>
    </Flex>
  );
};
