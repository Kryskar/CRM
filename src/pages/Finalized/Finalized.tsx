import { useEffect, useState } from 'react';
import { Flex, FormControl, Select, useMediaQuery } from '@chakra-ui/react';

import { useGetFinalizedFromSupabase } from '../../api/queries/useGetFinalizedfromSupabase';
import { useGetUsersFromSupabase } from '../../api/queries/useGetUsersFromSupabase';
import { ClientsTableSort } from '../../components/ClientsTable/ClientsTableSort';
import { columnsFinalized, columnsFinalizedHeaders } from '../../components/ClientsTable/columns';
import BigSpinner from '../../components/Misc/BigSpinner';
import { SCROLLBAR } from '../../constants/custom_styles';
import { BOX_SHADOW } from '../../constants/theme';
import { useThemeContext } from '../../contexts/ThemeProvider';

const Finalized = () => {
  const { data, isLoading } = useGetFinalizedFromSupabase();
  const { data: users, isLoading: isLoadingUsers } = useGetUsersFromSupabase();
  const [filteredData, setFilteredData] = useState(data);
  const { CONDITIONAL_OPTION_THEME } = useThemeContext();
  const [isLargerThan1300] = useMediaQuery('(min-width: 1300px)');
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const singleAgentFinalized = data.filter((el) => el.agentEmail === e.target.value);
    setFilteredData(singleAgentFinalized);
    if (e.target.value === 'all') {
      setFilteredData(data);
    }
  };

  if (isLoading || isLoadingUsers) return <BigSpinner />;
  return (
    <Flex justifyContent={'center'}>
      <Flex flexDirection={'column'} gap='20px' w={isLargerThan1300
? '95%'
: 'fit-content'}>
        <FormControl alignSelf={'flex-end'} w={{ base: '150px' }}>
          <Select border={"1px"} onChange={handleChange}>
            <option style={CONDITIONAL_OPTION_THEME} value={'all'}>
              {'all'}
            </option>
            {users.map((user) => (
              <option key={user.id} style={CONDITIONAL_OPTION_THEME} value={user.email}>
                {user.fullName}
              </option>
            ))}
          </Select>
        </FormControl>
        <Flex
          __css={SCROLLBAR}
          boxShadow={BOX_SHADOW}
          maxH='75vh'
          mb='50px'
          overflow='auto'
          borderRadius={isLargerThan1300
? ''
: '20px'}
          p={isLargerThan1300
? ''
: '20px'}
          w={isLargerThan1300
? '100%'
: { base: '400px', md: '550px' }}
        >
          <ClientsTableSort
            columnProps={[columnsFinalized, columnsFinalizedHeaders]}
            data={filteredData}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Finalized;
