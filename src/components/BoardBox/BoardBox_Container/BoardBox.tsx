import { ChangeEvent, useState } from 'react';
import { Flex, FlexProps, Select, Text } from '@chakra-ui/react';

import { BOX_SHADOW } from '../../../constants/theme';
import BoardBox_Events from '../BoardBox_Items/BoardBox_Events';

const BoardBox = ({ ...flexProps }: FlexProps) => {
  const [changelogRange, setChangelogRange] = useState(30); //eslint-disable-line
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setChangelogRange(Number(e.target.value));
  const options = [30, 60, 90, 0]; //eslint-disable-line
  return (
    <Flex
      bgColor={'secondaryColor'}
      borderRadius='10px'
      boxShadow={BOX_SHADOW}
      flexDirection={'column'}
      h={{ base: '40vh', lg: '80vh' }}
      {...flexProps}
    >
      <Flex justifyContent={'space-between'} paddingBottom={'5px'} px='30px' py='20px'>
        <Text fontWeight={600}>Changelog:</Text>
        <Select
          bgColor={'primaryColor'}
          border={'1px'}
          h={'30px'}
          w='140px'
          onChange={handleChange}
        >
          {options.map((option) => (
            <option key={option} value={option}>{option != 0
? `Last ${option} days`
: 'All'}</option>
          ))}
        </Select>
      </Flex>
      <BoardBox_Events changelogRange={changelogRange} />
    </Flex>
  );
};

export default BoardBox;
