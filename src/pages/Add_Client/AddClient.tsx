import { Box, Flex } from '@chakra-ui/react';

import AddClient_Container from '../../components/AddClient/AddClient_Container/AddClient_Contaier';

const AddClient = () => {
  return (
    <Flex alignItems={'center'} h={'100vh'} justifyContent={'center'} w={'100vw'}>
      <Box w={"40%"}>
      <AddClient_Container data={null} />
      </Box>
    </Flex>
  );
};

export default AddClient;
