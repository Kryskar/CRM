import { Flex } from '@chakra-ui/react';

import StatisticsIndividualAndTeam from '../../components/Analitics/Analitics_Items/StatisticsIndividualAndTeam/StatisticsIndividualAndTeam';
import TeamMembersRankings2 from '../../components/Analitics/Analitics_Items/TeamRanking2';
import TeamChart from '../../components/Analitics/TeamChart/TeamChart';
import { useStatisticsContext } from '../../contexts/StatisticsProvider';


const Analytics = () => {
  const { combinedTeamArrCurrentMonth, finalizedDataTeamThisMonth } = useStatisticsContext();
  return (
    <Flex  justifyContent={'space-between'} mt={"40px"} p='0 40px 0 40px' w='100%'>
      <StatisticsIndividualAndTeam />
      <TeamChart data={{ finalizedDataTeamThisMonth, combinedTeamArrCurrentMonth }} />
      <TeamMembersRankings2 />
    </Flex>
  );
};

export default Analytics;
