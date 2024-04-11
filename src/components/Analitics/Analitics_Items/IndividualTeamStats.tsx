import { chakra,Flex, Text } from "@chakra-ui/react";

import { CombinedArrItem } from "../../../contexts/StatisticsProvider";

export const IndividualTeamStats = ({ item }: { item: CombinedArrItem }) => {
    return (
      <Flex key={item.id} bgColor={'secondaryColor'} borderRadius={'10px'} flexDirection={'column'} p="15px">
        <Text fontWeight={'600'}>{item.fullName}</Text>
        <Text>stats:</Text>
        <Text>
          <chakra.span fontWeight={'600'}>total successes: </chakra.span>
          {item.statistics.totalAgentFinalizedValue}
        </Text>
        <Text>
          <chakra.span fontWeight={'600'}>monthly individual plan realisation: </chakra.span>
          {item.statistics.agentPrecentPlanRealization}%
        </Text>
        <Text>
          <chakra.span fontWeight={'600'}>contribution to team plan: </chakra.span>
          {item.statistics.contributionToTeamPlan}%
        </Text>
        <Text>estimation:</Text>
        <Text>
          <chakra.span fontWeight={'600'}>total chances: </chakra.span>
          {item.statistics.totalAgentChancesValue}
        </Text>
      </Flex>
    );
  };