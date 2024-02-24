import { FcGoogle } from 'react-icons/fc';
import { Button, Flex } from '@chakra-ui/react';
import { googleSignIn } from '../../hooks/googleSignIn';

const LogIn = () => {
  return (
    <Flex alignItems={'center'} h='100vh' justifyContent={'center'} w='100vw'>
      {/* <Box w={'50%'}>
      <Auth
        appearance={{ theme: ThemeSupa }}
        providers={['google']}
        supabaseClient={supabase}
      />
    </Box> */}
      <Button onClick={googleSignIn}>
        <FcGoogle /> Sign In
      </Button>
    </Flex>
  );
};

export default LogIn;
