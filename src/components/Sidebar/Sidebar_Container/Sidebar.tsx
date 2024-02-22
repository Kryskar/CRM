import { Button, Flex } from '@chakra-ui/react';

const Sidebar = () => {
  return (
    <Flex bgColor={'secondaryColor'} color={'fontColor'} h={'100%'} pos={'sticky'} w={'240px'}>
      <Button variant={'blue'}>button</Button>
      sidebar
    </Flex>
  );
};

export default Sidebar;
