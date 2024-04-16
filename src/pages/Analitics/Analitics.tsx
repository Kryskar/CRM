import { Flex } from '@chakra-ui/react';

import StatisticsIndividualAndTeam from '../../components/Analitics/Analitics_Items/StatisticsIndividualAndTeam/StatisticsIndividualAndTeam';
import TeamMembersRankings2 from '../../components/Analitics/Analitics_Items/TeamRanking2';
import TeamChart from '../../components/Analitics/TeamChart/TeamChart';
import { useStatisticsContext } from '../../contexts/StatisticsProvider';


const Analitics = () => {
  const { combinedTeamArrCurrentMonth, finalizedDataTeamThisMonth } = useStatisticsContext();

  return (
    <Flex justifyContent={'space-between'} p='0 40px 0 40px' w='100%'>
      <StatisticsIndividualAndTeam />
      <TeamMembersRankings2 />
      <TeamChart data={{ finalizedDataTeamThisMonth, combinedTeamArrCurrentMonth }} />
    </Flex>
  );
};

export default Analitics;
