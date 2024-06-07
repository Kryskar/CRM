import { Avatar, chakra, Flex, Text } from '@chakra-ui/react';

import { AGENT_PLAN, analyticsGetColor, firstWordCharToUppercase } from '../../../../constants/constants';
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

  const { label: individualPlanRealisationLabel } = data.individualPlanRealisation;
  const { label: totalSuccessesLabel } = data.totalSuccesses;

  return (
    <CustomAnalyticsFlex gap='15px' w={{ base: '300px', md: '500px', lg: '100%' }}>
      <Flex justifyContent={'space-between'}>
        <Text fontWeight={'600'}>{fullName}</Text>
        <Avatar size={'sm'} src={picture} />
      </Flex>
      <Flex flexDirection={'column'}>
        {Object.values(data).map((item) => (
          <Flex key={item.label} justifyContent={'space-between'}>
            <chakra.span fontWeight={'600'}>{firstWordCharToUppercase(item.label)}</chakra.span>
            <chakra.span
              color={analyticsGetColor(item, individualPlanRealisationLabel, totalSuccessesLabel)}
            >
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
