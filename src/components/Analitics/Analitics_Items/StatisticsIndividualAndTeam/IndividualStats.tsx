import { Avatar, chakra, Flex, Text } from '@chakra-ui/react';

import { AGENT_PLAN, parseDynamic } from '../../../../constants/constants';
import { CombinedArrItem } from '../../../../contexts/StatisticsProvider';
import CustomAnalyticsFlex from '../CustomAnaliticsFlex';

export const IndividualStats = ({
  item: {
    fullName,
    picture,
    statistics: {
      agentPrecentPlanRealization,
      contributionToTeamPlan,
      totalAgentChancesValue,
      totalAgentFinalizedValue,
    },
  },
}: {
  item: CombinedArrItem;
}) => {
  const data = {
    individualPlan: { label: 'individual plan: ', value: AGENT_PLAN },
    totalSuccesses: { label: 'total successes: ', value: totalAgentFinalizedValue },
    individualPlanRealisation: {
      label: 'individual plan realisation: ',
      value: agentPrecentPlanRealization,
    },
    contributionToTeamPlan: { label: 'contribution to team plan: ', value: contributionToTeamPlan },
    totalChances: { label: 'total chances: ', value: totalAgentChancesValue },
  };

  const getColor = (item: { label: string; value: number | string }) => {
    const HALF = 0.5;
    const HUNDRED_PRECENT = 100
    const value = parseDynamic(item.value);
    if (item.label === data.totalSuccesses.label) {
      if (value < AGENT_PLAN * HALF) {
        return 'red';
      } else if (value > AGENT_PLAN * HALF) {
        return 'orange';
      } else if (value > AGENT_PLAN) {
        return 'green';
      }
    }
    if (item.label === data.individualPlanRealisation.label) {
      if (value < HUNDRED_PRECENT * HALF) {
        return 'red';
      } else if (value > HUNDRED_PRECENT * HALF) {
        return 'orange';
      } else if (value > HUNDRED_PRECENT) {
        return 'green';
      }
    }
    return 'fontColor';
  };

  return (
    <CustomAnalyticsFlex gap='15px'>
      <Flex justifyContent={'space-between'}>
        <Text fontWeight={'600'}>{fullName}</Text>
        <Avatar size={'sm'} src={picture} />
      </Flex>
      <Flex flexDirection={'column'}>
        {Object.values(data).map((item) => (
          <Flex key={item.label} justifyContent={'space-between'}>
            <chakra.span fontWeight={'600'}>{item.label}</chakra.span>
            <chakra.span color={getColor(item)}>
              {item.label === data.individualPlanRealisation.label ||
              item.label === data.contributionToTeamPlan.label
                ? item.value + '%'
                : item.value}
            </chakra.span>
          </Flex>
        ))}
      </Flex>
    </CustomAnalyticsFlex>
  );
};
