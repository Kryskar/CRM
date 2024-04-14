import { useState } from 'react';
import { Flex, FormControl, Select, Text } from '@chakra-ui/react';

import { FinalizedRecord } from '../../../api/queries/useGetFinalizedfromSupabase';
import {
  EMPTY_ARR,
  firstWordCharToUppercase,
  INDEX_OF_FIRST_ITEM,
} from '../../../constants/constants';
import { CombinedArrItem } from '../../../contexts/StatisticsProvider';
import { TeamSuccessesBanksPieChart } from '../Analitics_Items/PieChart/TeamSuccessesBanksPieChart';

type TeamChartProps = {
  data: {
    combinedTeamArrCurrentMonth: CombinedArrItem[];
    finalizedDataTeamThisMonth: FinalizedRecord[];
  };
};

const TeamChart = ({
  data: { combinedTeamArrCurrentMonth, finalizedDataTeamThisMonth },
}: TeamChartProps) => {
  const TEAM_STRING = 'team';
  const [filteredData, setFilteredData] = useState(finalizedDataTeamThisMonth);
  const [filteredDataLabel, setFilteredDataLabel] = useState(firstWordCharToUppercase(TEAM_STRING));

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const singleAgentFinalizedArr = finalizedDataTeamThisMonth.filter(
      (el) => el.agentEmail === e.target.value,
    );
    setFilteredData(singleAgentFinalizedArr);
    if (e.target.value !== TEAM_STRING && singleAgentFinalizedArr.length !== EMPTY_ARR) {
      const user = combinedTeamArrCurrentMonth.find(
        (el) => el.email === singleAgentFinalizedArr[INDEX_OF_FIRST_ITEM].agentEmail,
      );
      if (user) setFilteredDataLabel(user.fullName);
    }
    if (e.target.value === TEAM_STRING) {
      setFilteredData(finalizedDataTeamThisMonth);
      setFilteredDataLabel(firstWordCharToUppercase(TEAM_STRING));
    }
  };
  return (
    <Flex flexDirection={'column'} gap='20px'>
      <Text fontSize={'18px'} fontWeight={'600'} textAlign={'center'}>
        {filteredDataLabel} Success Data
      </Text>
      <FormControl alignSelf={'center'} w={'200px'}>
        <Select onChange={handleChange}>
          <option value={TEAM_STRING}>{TEAM_STRING}</option>
          {combinedTeamArrCurrentMonth.map((user) => (
            <option key={user.id} value={user.email}>
              {user.fullName}
            </option>
          ))}
        </Select>
      </FormControl>
      <Flex justifyContent={'center'}>
        {filteredData.length !== EMPTY_ARR && <TeamSuccessesBanksPieChart data={filteredData} />}
        {filteredData.length === EMPTY_ARR && <Text>no successes this month yet</Text>}
      </Flex>
    </Flex>
  );
};

export default TeamChart;
