import { Flex, Spinner } from '@chakra-ui/react';

const BigSpinner = () => {
  return (
    <Flex alignItems={'center'} h={'90vh'} justifyContent={'center'} w={'100vw'}>
      <Spinner color='red.500' size={'xl'} />
    </Flex>
  );
};

export default BigSpinner;
