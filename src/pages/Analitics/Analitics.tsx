import { chakra,Flex, Text } from '@chakra-ui/react';

import { IndividualTeamStats } from '../../components/Analitics/Analitics_Items/IndividualTeamStats';
import { PieChart } from '../../components/Analitics/Analitics_Items/PieChart/PieChart';
import { AGENT_PLAN, DAYS_IN_CURRENT_MONTH, DAYS_UNTIL_END_OF_MONTH, TEAM_PLAN, TODAY } from '../../constants/constants';
import { useStatisticsContext } from '../../contexts/StatisticsProvider';

const Analitics = () => {
  const { combinedTeamArrCurrentMonth, teamPrecentPlanRealization } = useStatisticsContext();
  const timePassedPrecentage = (TODAY/DAYS_IN_CURRENT_MONTH*100).toFixed(2)+"%" //eslint-disable-line
  const stats =[
    {label:'individual plan:',
      value:AGENT_PLAN
    },
    {label:'team plan:',
      value:TEAM_PLAN
    },
    {label:'days until end of month:',
      value:DAYS_UNTIL_END_OF_MONTH
    },
    {label:'time passed:',
      value:timePassedPrecentage
    },
    {label:'team plan realisation:',
      value:teamPrecentPlanRealization+"%"
    },
  ]
  return (
    <Flex w='100%'>
      <Flex flexDirection={'column'} gap='35px'>
        <Flex flexDirection={'column'}>
          {stats.map(el => (<Text key={el.label}>
            <chakra.span fontWeight={'600'}>{el.label}</chakra.span>
            {el.value}
          </Text>))}
        </Flex>
        {combinedTeamArrCurrentMonth.map((item) => (
          <IndividualTeamStats key={item.id} item={item} />
        ))}
      </Flex>
      <Flex>
      <PieChart/>
      </Flex>
    </Flex>
  );
};

export default Analitics;
