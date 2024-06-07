import { Flex, FlexProps, SimpleGrid, Text } from '@chakra-ui/react';

import { SCROLLBAR } from '../../../../constants/custom_styles';
import { useSessionContext } from '../../../../contexts/SessionProvider';
import { CombinedArrItem, useStatisticsContext } from '../../../../contexts/StatisticsProvider';
import { useThemeContext } from '../../../../contexts/ThemeProvider';
import CustomAnalyticsFlex from '../CustomAnaliticsFlex';

import { BarChartStats, createDataAndOptionsForBarChart } from './Bar/BarChartStats';
import { IndividualStats } from './IndividualStats';
import { TeamPlanAndRealisation } from './TeamPlanAndRealisation';

const StatisticsIndividualAndTeam = ({...rest}:FlexProps) => {
  const { combinedTeamArrCurrentMonth } = useStatisticsContext();
  const { email } = useSessionContext();
  const { isDarkMode } = useThemeContext();
  const loggedInUserFirstInArrSort = (a: CombinedArrItem, b: CombinedArrItem) => {
    if (a.email === email) return -1;
    if (b.email === email) return 1;
    return 0;
  };
  const combinedTeamLoggedInUserFirst = combinedTeamArrCurrentMonth.sort(
    loggedInUserFirstInArrSort,
  );
  const [loggedInUser, ...restOfTeam] = combinedTeamLoggedInUserFirst;
  const dataset = [
    loggedInUser.statistics.numberOfFinalized,
    loggedInUser.statistics.numberOfChances,
    loggedInUser.statistics.numberOfNotDoable,
  ];

  const { data, options } = createDataAndOptionsForBarChart(dataset, isDarkMode);
  return (
    <Flex {...rest} flexDirection={'column'} gap='10px'>
      <TeamPlanAndRealisation />
      <Text fontWeight={600}>Your statistics:</Text>
      <SimpleGrid columns={{ base: 1, lg: 2 }} pr={'10px'} spacing={8}>
        <IndividualStats item={loggedInUser} />
        <CustomAnalyticsFlex
          alignItems={'center'}
          h={{ base: '150px', md: '230px', lg: 'auto' }}
          justifyContent={'center'}
          w={{ base: '300px', md: '500px', lg: '100%' }}
        >
          <BarChartStats settings={{ data, options }} />
        </CustomAnalyticsFlex>
      </SimpleGrid>
      <Text fontWeight={600}>Rest of team members statistics:</Text>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        h='400px'
        overflow='auto'
        pb={'5px'}
        pr={'10px'}
        spacing={8}
        sx={SCROLLBAR}
      >
        {restOfTeam.map((item) => (
          <IndividualStats key={item.id} item={item} />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default StatisticsIndividualAndTeam;
