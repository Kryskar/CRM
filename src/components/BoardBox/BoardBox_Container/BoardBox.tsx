import { Flex, FlexProps, Text } from '@chakra-ui/react';

import { BOX_SHADOW } from '../../../constants/theme';
import BoardBox_Events from '../BoardBox_Items/BoardBox_Events';


const BoardBox = ({ ...flexProps }: FlexProps) => {
  return (
    <Flex
      bgColor={'secondaryColor'}
      borderRadius='10px'
      boxShadow={BOX_SHADOW}
      flexDirection={'column'}
      h={'80vh'}
      {...flexProps}
    >
      <Text fontWeight={600} p='30px' paddingBottom={'5px'}>
        Changelog:
      </Text>
      <BoardBox_Events />
    </Flex>
  );
};

export default BoardBox;
