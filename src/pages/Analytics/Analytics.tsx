import { Flex } from '@chakra-ui/react';

import StatisticsIndividualAndTeam from '../../components/Analitics/Analitics_Items/StatisticsIndividualAndTeam/StatisticsIndividualAndTeam';
import TeamMembersRankings2 from '../../components/Analitics/Analitics_Items/TeamRanking2';
import TeamChart from '../../components/Analitics/TeamChart/TeamChart';
import { useStatisticsContext } from '../../contexts/StatisticsProvider';

const Analytics = () => {
  const { combinedTeamArrCurrentMonth, finalizedDataTeamThisMonth } = useStatisticsContext();
  return (
    <Flex
      alignItems={{ base: 'center', md: 'center', lg: 'flex-start' }}
      flexDirection={{ base: 'column', md: 'column', lg: 'row' }}
      gap={{ base: '30px', md: '30px', lg: '0px' }}
      justifyContent={{ lg: 'space-between' }}
      mt={{ base: '20px', lg: '40px' }}
      p='0 40px 0 40px'
      w='100%'
    >
      <StatisticsIndividualAndTeam className='step36' />
      <TeamChart className='step37' data={{ finalizedDataTeamThisMonth, combinedTeamArrCurrentMonth }} />
      <TeamMembersRankings2 className='step38' />
    </Flex>
  );
};

export default Analytics;
