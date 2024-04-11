import { ChangeEvent } from 'react';
import { chakra,Flex, Select, Text } from '@chakra-ui/react';

import { MONTH_NAME } from '../../../constants/constants';
import { useStatisticsContext } from '../../../contexts/StatisticsProvider';

export const AnaliticsSidebarComponent = ({
  state,
}: {
  state: { setView: React.Dispatch<React.SetStateAction<string>>, view: string; };
}) => {
  const { setView, view } = state;
  const {
    agentPrecentPlanRealization,
    teamPrecentPlanRealization,
    totalAgentChancesValue,
    totalFinalizedAgentThisMonth,
    totalFinalizedTeamThisMonth,
    totalTeamChancesValue,
  } = useStatisticsContext();
  // const [view, setView] = useState('agent');
  const conditionalString = view === 'agent'
? 'your'
: 'team';
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => setView(e.target.value);

  return (
    <Flex bgColor='inherit' color='fontColor' flexDirection='column' pos='sticky'>
      <Flex
        alignItems={'center'}
        borderBottom='1px solid'
        borderColor='scrollbarColor'
        fontSize='12px'
        h='fit-content'
        justifyContent={'space-between'}
        pb='10px'
        pl='15px'
        pr='15px'
        pt='10px'
        w='100%'
      >
        <Text>Quick statistics</Text>
        <Select bgColor={'primaryColor'} h={'30px'} w='100px' onChange={handleChange}>
          <option value='agent'>agent</option>
          <option value='team'>team</option>
        </Select>
      </Flex>
      <Flex
        flexDirection='column'
        fontWeight='500'
        h='fit-content'
        pb='10px'
        pl='15px'
        pt='10px'
        w='100%'
      >
        Value of {conditionalString} open sales chances
        <chakra.span fontSize='23px'>
          {view === 'agent'
? totalAgentChancesValue
: totalTeamChancesValue}
        </chakra.span>
      </Flex>
      <Flex
        borderBottom='1px solid'
        borderColor='scrollbarColor'
        borderTop='1px solid'
        flexDirection='column'
        fontWeight='500'
        h='fit-content'
        pb='10px'
        pl='15px'
        pt='10px'
        w='100%'
      >
        Value of {conditionalString} successes in {MONTH_NAME}
        <chakra.span fontSize='23px'>
          {view === 'agent'
? totalFinalizedAgentThisMonth
: totalFinalizedTeamThisMonth}
        </chakra.span>
        <chakra.span>{`${view === 'agent'
? agentPrecentPlanRealization+'% of individual plan realisation'
: teamPrecentPlanRealization+'% of team plan realisation'}`}</chakra.span>
      </Flex>
    </Flex>
  );
};
