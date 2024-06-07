import { useState } from 'react';
import { Flex, FlexProps, FormControl, Select, Text } from '@chakra-ui/react';

import { FinalizedRecord } from '../../../api/queries/useGetFinalizedfromSupabase';
import { EMPTY_ARR, firstWordCharToUppercase } from '../../../constants/constants';
import { CombinedArrItem } from '../../../contexts/StatisticsProvider';
import { useThemeContext } from '../../../contexts/ThemeProvider';

import { TeamSuccessesBanksPieChart } from './PieChart/TeamSuccessesBanksPieChart';

type TeamChartProps = {
  data: {
    combinedTeamArrCurrentMonth: CombinedArrItem[];
    finalizedDataTeamThisMonth: FinalizedRecord[];
  };
};

const TeamChart = ({
  data: { combinedTeamArrCurrentMonth, finalizedDataTeamThisMonth }, ...rest
}: TeamChartProps & FlexProps) => {
  const TEAM_STRING = 'Team';
  const [filteredData, setFilteredData] = useState(finalizedDataTeamThisMonth);
  const [filteredDataLabel, setFilteredDataLabel] = useState(firstWordCharToUppercase(TEAM_STRING));
  const { CONDITIONAL_OPTION_THEME } = useThemeContext();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const singleAgentFinalizedArr = finalizedDataTeamThisMonth.filter(
      (el) => el.agentEmail === e.target.value,
    );
    setFilteredData(singleAgentFinalizedArr);

    const userForLabel = combinedTeamArrCurrentMonth.find((el) => el.email === e.target.value);

    if (userForLabel) setFilteredDataLabel(userForLabel.fullName);
    if (e.target.value === TEAM_STRING) {
      setFilteredData(finalizedDataTeamThisMonth);
      setFilteredDataLabel(firstWordCharToUppercase(TEAM_STRING));
    }
  };
  return (
    <Flex {...rest} flexDirection={'column'} gap='20px'>
      <Text fontSize={'16px'} fontWeight={'600'} textAlign={'center'}>
        {filteredDataLabel} Success Data
      </Text>
      <FormControl alignSelf={'center'} w={'200px'}>
        <Select border={"1px"} onChange={handleChange}>
          <option style={CONDITIONAL_OPTION_THEME} value={TEAM_STRING}>
            {TEAM_STRING}
          </option>
          {combinedTeamArrCurrentMonth.map((user) => (
            <option key={user.id} style={CONDITIONAL_OPTION_THEME} value={user.email}>
              {user.fullName}
            </option>
          ))}
        </Select>
      </FormControl>
      <Flex justifyContent={'center'} w={'300px'}>
        {filteredData.length !== EMPTY_ARR && <TeamSuccessesBanksPieChart data={filteredData} />}
        {filteredData.length === EMPTY_ARR && <Text>no successes this month yet</Text>}
      </Flex>
    </Flex>
  );
};

export default TeamChart;
