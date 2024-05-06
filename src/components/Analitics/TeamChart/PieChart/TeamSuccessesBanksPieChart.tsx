import { Pie } from 'react-chartjs-2';
import { Flex } from '@chakra-ui/react';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { FinalizedRecord } from '../../../../api/queries/useGetFinalizedfromSupabase';
import {
  POLISH_BANKS_LOGOS_COLORS_ARR,
  POLISH_BANKS_LOGOS_COLORS_DARK_MODE_ARR,
} from '../../../../constants/constants';
import { useThemeContext } from '../../../../contexts/ThemeProvider';
import CustomAnalyticsFlex from '../../Analitics_Items/CustomAnaliticsFlex';

import { BankFinalizedPieChartLegendElement } from './BankFinalizedPieChartLegendElement';
import { createDataAndOptionsForPieChart } from './pieChartHelpers';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface BankData {
  [key: string]: number;
}

type ArrOfLabelsAndSettings = [
  string,
  { backgroundColor: string; borderColor: string; logo: string },
  number,
];

export const TeamSuccessesBanksPieChart = ({ data }: { data: FinalizedRecord[] }) => {
  const { isDarkMode } = useThemeContext();
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
  const bankArrConditionalTheme = isDarkMode
    ? POLISH_BANKS_LOGOS_COLORS_DARK_MODE_ARR
    : POLISH_BANKS_LOGOS_COLORS_ARR;
  const arrOfLabelsAndSettings: ArrOfLabelsAndSettings[] = arrOfLabels.map((label) => {
    const labelsWithSettings = bankArrConditionalTheme.find(([bank]) => bank === label);
    if (labelsWithSettings) {
      const [bank, settings] = labelsWithSettings;
      return [bank, settings, arrOfValues[arrOfLabels.indexOf(label)]];
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
    isDarkMode,
  );

  return (
    <Flex flexDirection={'column'} gap="30px">
      <Flex w="300px">
        <Pie data={pieChartData} options={options} />
      </Flex>
      <CustomAnalyticsFlex flexDirection={'column'} gap={'5px'} p='20px'>
        {arrOfLabelsAndSettings.map(([label, obj, value]) => (
          <BankFinalizedPieChartLegendElement key={label} settings={{ label, obj, value }} />
        ))}
      </CustomAnalyticsFlex>
    </Flex>
  );
};
