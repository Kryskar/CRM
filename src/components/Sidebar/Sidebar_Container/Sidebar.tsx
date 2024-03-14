import { Flex } from '@chakra-ui/react';

const Sidebar = ({w}:{w:string}) => {
  return (
    <Flex bgColor={'secondaryColor'} color={'fontColor'} h={'100%'} pos={'sticky'} w={w}>
      sidebar
    </Flex>
  );
};

export default Sidebar;
