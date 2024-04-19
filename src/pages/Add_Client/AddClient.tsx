import { Box, Flex } from '@chakra-ui/react';

import AddClient_Container from '../../components/AddClient/AddClient_Container/AddClient_Contaier';

const AddClient = () => {
  return (
    <Flex alignItems={'center'} justifyContent={'center'} mt="150px" w={'100vw'}>
      <Box w={"40%"}>
      <AddClient_Container data={null} />
      </Box>
    </Flex>
  );
};

export default AddClient;
