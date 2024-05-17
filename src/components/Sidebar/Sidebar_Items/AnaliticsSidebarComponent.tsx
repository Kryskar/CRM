import { ChangeEvent } from 'react';
import { chakra, Flex, Select, Text } from '@chakra-ui/react';

import { MONTH_NAME } from '../../../constants/constants';
import { useStatisticsContext } from '../../../contexts/StatisticsProvider';
import { useThemeContext } from '../../../contexts/ThemeProvider';

export const AnaliticsSidebarComponent = ({
  state,
}: {
  state: { setView: React.Dispatch<React.SetStateAction<string>>; view: string };
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
  const { CONDITIONAL_OPTION_THEME } = useThemeContext();
  // const [view, setView] = useState('agent');
  const isAgent = view === 'agent';
  const conditionalString = isAgent
? 'your'
: 'team';
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => setView(e.target.value);
  const selectOptions = ['agent', 'team'];

  return (
    <Flex bgColor='inherit' color='fontColor' flexDirection='column' pos='sticky'>
      <Flex
        alignItems={'center'}
        borderBottom='1px solid'
        fontSize={{ md: 12, lg: 12 }} //to  be set later
        h='fit-content'
        justifyContent={'space-between'}
        px='15px'
        py='10px'
        w='100%'
      >
        <Text>Quick statistics</Text>
        <Select bgColor={'primaryColor'} border={"1px"} h={'30px'} w='100px' onChange={handleChange}>
          {selectOptions.map((el) => (
            <option key={el} style={CONDITIONAL_OPTION_THEME} value={el}>
              {el}
            </option>
          ))}
        </Select>
      </Flex>
      <Flex
        flexDirection='column'
        fontSize={{ md: 16, lg: 16 }} //to  be set later
        fontWeight='500'
        h='fit-content'
        pl='15px'
        py='10px'
        w='100%'
      >
        Value of {conditionalString} open sales chances
        <chakra.span
          fontSize={{ md: 23, lg: 23 }} //to  be set later
        >
          {isAgent
? totalAgentChancesValue
: totalTeamChancesValue}
        </chakra.span>
      </Flex>
      <Flex
        borderBottom='1px solid'
        borderTop='1px solid'
        flexDirection='column'
        fontSize={{ md: 16, lg: 16 }} //to  be set later
        fontWeight='500'
        h='fit-content'
        pl='15px'
        py='10px'
        w='100%'
      >
        Value of {conditionalString} successes in {MONTH_NAME}
        <chakra.span
          fontSize={{ md: 23, lg: 23 }} //to  be set later
        >
          {isAgent
? totalFinalizedAgentThisMonth
: totalFinalizedTeamThisMonth}
        </chakra.span>
        <chakra.span>{`${
          isAgent
            ? agentPrecentPlanRealization + '% of individual plan realisation'
            : teamPrecentPlanRealization + '% of team plan realisation'
        }`}</chakra.span>
      </Flex>
    </Flex>
  );
};
