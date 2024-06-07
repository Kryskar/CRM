import { ChangeEvent, useEffect, useState } from 'react';
import { InfoOutlineIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Flex,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  Radio,
  RadioGroup,
  Stack,
  Tooltip,
  useBreakpointValue,
} from '@chakra-ui/react';

import { NewClient } from '../../api/mutations/Clients/useAddClientToSupabase';
import { FinalizedRecord } from '../../api/queries/useGetFinalizedfromSupabase';
import { useOpeationsContext } from '../../contexts/OperationsProvider';

import { filterSearchBarFn } from './searchBarHelpers';

const SearchBar = ({
  clientStatusToFilter = '',
  data,
  searchTools,
  setFilteredData,
}: {
  clientStatusToFilter?: string;
  data: NewClient[] | FinalizedRecord[];
  searchTools: any; //eslint-disable-line
  setFilteredData:
    | React.Dispatch<React.SetStateAction<NewClient[]>>
    | React.Dispatch<React.SetStateAction<FinalizedRecord[]>>;
}) => {
  const { getRadioNameForFiltering, radios, radioValue, searchTerm, setRadioValue, setSearchTerm } =
    searchTools;
  const { isTaskboardClientClicked, setIsTaskboardClientClicked, TaskboardClientPhoneNumber } =
    useOpeationsContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = filterSearchBarFn(data, getRadioNameForFiltering, searchTerm);
  useEffect(() => {
    setFilteredData(filteredData);
  }, [searchTerm, clientStatusToFilter, data]); //eslint-disable-line
  useEffect(() => {
    if (isTaskboardClientClicked) {
      setRadioValue('3');
      setSearchTerm(TaskboardClientPhoneNumber);
      setIsTaskboardClientClicked(false);
    }
  }, [isTaskboardClientClicked]); //eslint-disable-line
  
  const searchTooltipPlacement: 'top' | 'right' =
    useBreakpointValue({ base: 'top', md: 'right' }) || 'top';
  return (
    <Flex flexDirection={'column'}>
      <FormControl alignSelf={'flex-end'} w={{ base: '150px', md: '200px', lg: '250px' }}>
        <InputGroup gap={'10px'}>
          <InputLeftElement>
            <Menu isOpen={isMenuOpen} onClose={closeMenu}>
              <MenuButton
                aria-label='search by'
                as={IconButton}
                bgColor={'primaryColor'}
                borderColor={'transparent'}
                color={'fontColor'}
                icon={<SearchIcon />}
                size={'sm'}
                variant='outline'
                sx={{
                  _hover: {
                    bg: 'secondaryColor',
                    borderColor: 'fontColor',
                  },
                  _focus: {
                    bg: 'secondaryColor',
                  },
                  _active: {
                    bg: 'secondaryColor',
                  },
                }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
              <MenuList bgColor={'primaryColor'} pl='20px'>
                <RadioGroup
                  bgColor={'primaryColor'}
                  color={'fontColor'}
                  value={radioValue}
                  onChange={setRadioValue}
                >
                  <Stack>
                    {radios.map((radio: string, index: number) => (
                      <Radio key={radio} value={String(index + 1)}>{radio}</Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </MenuList>
            </Menu>
          </InputLeftElement>
          <InputRightElement>
            <Tooltip
              hasArrow
              bgColor={'tertiaryColor'}
              color={'fontColor'}
              label={`search by ${radios[+radioValue - 1]}`}
              placement={searchTooltipPlacement}
            >
              <InfoOutlineIcon />
            </Tooltip>
          </InputRightElement>
          <Input placeholder='Search' value={searchTerm} onChange={handleSearchChange} />
        </InputGroup>
      </FormControl>
    </Flex>
  );
};

export default SearchBar;
