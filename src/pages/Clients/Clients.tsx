import { useEffect, useState } from 'react';
import { Flex, FormControl, Select } from '@chakra-ui/react';

import { useGetClientsFromSupabase } from '../../api/queries/useGetClientsFromSupabase';
import { ClientsTableSort } from '../../components/ClientsTable/ClientsTableSort';
import { columnsClients, columnsClientsWithAgent } from '../../components/ClientsTable/columns';
import BigSpinner from '../../components/Misc/BigSpinner';
import { STATUSES } from '../../constants/constants';
import { SCROLLBAR } from '../../constants/custom_styles';
import { BOX_SHADOW } from '../../constants/theme';
import { useSessionContext } from '../../contexts/SessionProvider';
import { useThemeContext } from '../../contexts/ThemeProvider';

const Clients = () => {
  const { email } = useSessionContext();
  const [clientStatusToFilter, setClientStatusToFilter] = useState(STATUSES.callClient);
  const [isSelectTouched, setIsSelectTouched] = useState(false);
  const { data, error, isLoading } = useGetClientsFromSupabase(clientStatusToFilter, email);
  const { CONDITIONAL_OPTION_THEME } = useThemeContext();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setClientStatusToFilter(e.target.value);
    setIsSelectTouched(true);
  };

  useEffect(() => {
    if (!isLoading && data && !isSelectTouched) {
      if (data.length === 0 && clientStatusToFilter === STATUSES.callClient) {
        setClientStatusToFilter(STATUSES.chance);
      } else if (data.length === 0 && clientStatusToFilter === STATUSES.chance) {
        setClientStatusToFilter('all');
      }
    }
  }, [data, isSelectTouched, isLoading]); //eslint-disable-line
  const selectOptions = [STATUSES.callClient, STATUSES.chance, STATUSES.notDoable, 'all'];
  if (isLoading) {
    return <BigSpinner />;
  }
  if (error) {
    return <p>error</p>;
  }
  return (
    <Flex justifyContent={'center'} w='100%'>
      <Flex alignItems={'center'} flexDirection={'column'} gap='20px' w='95%'>
        <FormControl alignSelf={'flex-end'} w={{ base: '45%', md: '30%', lg: '15%' }}>
          <Select value={clientStatusToFilter} onChange={handleChange}>
            {selectOptions.map((el) => (
              <option key={el} style={CONDITIONAL_OPTION_THEME} value={el}>
                {el === STATUSES.chance
? 'your chances'
: el}
              </option>
            ))}
          </Select>
        </FormControl>
        <Flex boxShadow={BOX_SHADOW} maxH='75vh' mb='50px' overflow='auto' sx={SCROLLBAR} w='100%'>
          <ClientsTableSort
            data={data}
            columns={
              clientStatusToFilter === STATUSES.callClient ||
              clientStatusToFilter === STATUSES.chance
                ? columnsClients
                : columnsClientsWithAgent
            }
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Clients;
