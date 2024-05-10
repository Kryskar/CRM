import { FcGoogle } from 'react-icons/fc';
import { Button, chakra, Flex, Img, Text } from '@chakra-ui/react';

import { BOX_SHADOW } from '../../constants/theme';
import { googleSignIn } from '../../hooks/googleSignIn';

const LogIn = () => {
  return (
    <Flex
      alignItems={'center'}
      bgColor={'secondaryColor'}
      h='100vh'
      justifyContent={'center'}
      w='100vw'
    >
      <Flex
        alignItems={'center'}
        bgColor={'primaryColor'}
        borderRadius={'10px'}
        boxShadow={BOX_SHADOW}
        flexDirection={'column'}
        gap='50px'
        p='50px'
      >
        <Text fontSize={'35px'} fontWeight={'600'}>
          CRM
        </Text>
        <Img src='https://cdn-icons-png.flaticon.com/512/6295/6295417.png' w='150px' />
        <Button onClick={googleSignIn}>
          <Flex alignItems={'center'} gap='10px'>
            <FcGoogle />
            <chakra.span>
              Sign In with<chakra.span fontWeight={'700'}> Google</chakra.span>
            </chakra.span>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  );
};

export default LogIn;
