import { useEffect, useState } from 'react';
import { Flex, FormControl, Select, useMediaQuery } from '@chakra-ui/react';

import { useGetClientsFromSupabase } from '../../api/queries/useGetClientsFromSupabase';
import { ClientsTableSort } from '../../components/ClientsTable/ClientsTableSort';
import {
  columnsClients,
  columnsClientsHeaders,
  columnsClientsWithAgent,
  columnsClientsWithAgentHeaders,
} from '../../components/ClientsTable/columns';
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
  const [isLargerThan950] = useMediaQuery('(min-width: 950px)');
  const [isLargerThan1300] = useMediaQuery('(min-width: 1300px)');
  const isSimpleTable =
    clientStatusToFilter === STATUSES.callClient || clientStatusToFilter === STATUSES.chance;
    const rightMediaQuery = isSimpleTable
? isLargerThan950
: isLargerThan1300

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
    <Flex justifyContent={'center'} minH='calc(100vh - 100px)' w='95%'>
      <Flex
        alignItems={'center'}
        flexDirection={'column'}
        gap='20px'
        w={rightMediaQuery
? '95%'
: 'fit-content'}
      >
        <FormControl alignSelf={'flex-end'} w={{ base: '150px' }}>
          <Select border={"1px"} value={clientStatusToFilter} onChange={handleChange}>
            {selectOptions.map((el) => (
              <option key={el} style={CONDITIONAL_OPTION_THEME} value={el}>
                {el === STATUSES.chance
? 'your chances'
: el}
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
          overflowX={'hidden'}
          borderRadius={rightMediaQuery
? ''
: '20px'}
          p={rightMediaQuery
? ''
: '20px'}
          w={rightMediaQuery
? '100%'
: { base: '400px', md: '550px' }}
        >
          <ClientsTableSort
            data={data}
            columnProps={
              isSimpleTable
                ? [columnsClients, columnsClientsHeaders]
                : [columnsClientsWithAgent, columnsClientsWithAgentHeaders]
            }
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Clients;
