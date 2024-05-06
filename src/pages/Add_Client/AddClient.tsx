import { Flex } from '@chakra-ui/react';

import AddClient_Container from '../../components/AddClient/AddClient_Container/AddClient_Contaier';
import { BOX_SHADOW } from '../../constants/theme';

const AddClient = () => {
  return (
    <Flex alignItems={'center'} justifyContent={'center'} mt="150px" w={'100vw'}>
      <Flex borderRadius={"10px"} boxShadow={BOX_SHADOW} justifyContent={"center"} px="20px" py="50px" w={"40%"}>
      <AddClient_Container data={null} />
      </Flex>
    </Flex>
  );
};

export default AddClient;
