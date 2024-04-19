import { useEffect, useState } from 'react';
import { Flex, FormControl, Select, Spinner } from '@chakra-ui/react';

import { useGetFinalizedFromSupabase } from '../../api/queries/useGetFinalizedfromSupabase';
import { useGetUsersFromSupabase } from '../../api/queries/useGetUsersFromSupabase';
import { ClientsTableSort } from '../../components/ClientsTable/ClientsTableSort';
import { columnsFinalized } from '../../components/ClientsTable/columns';
import { SCROLLBAR } from '../../constants/custom_styles';
import { BOX_SHADOW } from '../../constants/theme';
import { useThemeContext } from '../../contexts/ThemeProvider';

const Finalized = () => {
  const { data, isLoading } = useGetFinalizedFromSupabase();
  const { data: users, isLoading: isLoadingUsers } = useGetUsersFromSupabase();
  const [filteredData, setFilteredData] = useState(data);
  const { CONDITIONAL_OPTION_THEME } = useThemeContext();

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

  if (isLoading || isLoadingUsers) return <Spinner />;
  return (
    <Flex justifyContent={'center'}>
      <Flex flexDirection={'column'} gap='20px' w='95%'>
        <FormControl alignSelf={'flex-end'} w={'15%'}>
          <Select onChange={handleChange}>
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
        <Flex boxShadow={BOX_SHADOW} maxH='75vh' overflow='auto' sx={SCROLLBAR}>
          <ClientsTableSort columns={columnsFinalized} data={filteredData} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Finalized;
