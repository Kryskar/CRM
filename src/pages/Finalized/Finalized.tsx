import { useEffect, useState } from 'react';
import { Flex, FormControl, Select, useMediaQuery } from '@chakra-ui/react';

import {
  FinalizedRecord,
  useGetFinalizedFromSupabase,
} from '../../api/queries/useGetFinalizedfromSupabase';
import { useGetUsersFromSupabase } from '../../api/queries/useGetUsersFromSupabase';
import { ClientsTableSort } from '../../components/ClientsTable/ClientsTableSort';
import { columnsFinalized, columnsFinalizedHeaders } from '../../components/ClientsTable/columns';
import BigSpinner from '../../components/Misc/BigSpinner';
import SearchBar from '../../components/Misc/SearchBar';
import { filterSearchBarFn } from '../../components/Misc/searchBarHelpers';
import { SCROLLBAR } from '../../constants/custom_styles';
import { BOX_SHADOW } from '../../constants/theme';
import { useThemeContext } from '../../contexts/ThemeProvider';

const Finalized = () => {
  const { data, isLoading } = useGetFinalizedFromSupabase();
  const { data: users, isLoading: isLoadingUsers } = useGetUsersFromSupabase();
  const [filteredData, setFilteredData] = useState(data);
  const { CONDITIONAL_OPTION_THEME } = useThemeContext();
  const [radioValue, setRadioValue] = useState('1');
  const [searchTerm, setSearchTerm] = useState('');
  const radios = [
    'name',
    'surname',
    'phone number',
    'bank',
    'loan amount',
    'intrest',
    'commission',
    'period',
  ];
  const getRadioNameForFiltering = () => {
    switch (radioValue) {
      case '2':
        return 'clientSurname';
      case '3':
        return 'clientPhoneNumber';
      case '4':
        return 'bank';
      case '5':
        return 'loanAmount';
      case '6':
        return 'intrest';
      case '7':
        return 'commission';
      case '8':
        return 'loanPeriod';
      default:
        return 'clientName';
    }
  };
  const [isLargerThan1300] = useMediaQuery('(min-width: 1300px)');
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const searchFiltered = filterSearchBarFn(data, getRadioNameForFiltering, searchTerm);
    const selectFiltered = searchFiltered.filter(
      (el: FinalizedRecord) => el.agentEmail === e.target.value,
    );
    setFilteredData(selectFiltered);
    if (e.target.value === 'all') {
      setFilteredData(searchFiltered);
    }
  };

  if (isLoading || isLoadingUsers) return <BigSpinner />;
 
  return (
    <Flex className='step33' justifyContent={'center'}>
      <Flex flexDirection={'column'} gap='20px' w={isLargerThan1300
? '95%'
: 'fit-content'}>
        <Flex justifyContent={'space-between'} w='100%'>
          <SearchBar
            data={data}
            setFilteredData={setFilteredData}
            searchTools={{
              radioValue,
              setRadioValue,
              searchTerm,
              setSearchTerm,
              radios,
              getRadioNameForFiltering,
            }}
          />
          <FormControl alignSelf={'flex-end'} w={{ base: '150px' }}>
            <Select border={'1px'} onChange={handleChange}>
              <option style={CONDITIONAL_OPTION_THEME} value={'all'}>
                {'All'}
              </option>
              {users.map((user) => (
                <option key={user.id} style={CONDITIONAL_OPTION_THEME} value={user.email}>
                  {user.fullName}
                </option>
              ))}
            </Select>
          </FormControl>
        </Flex>
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
