import { Box, Flex } from '@chakra-ui/react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

import { supabase } from '../../database/supabase';

const LogIn = () => {
  return (
    <Flex w="100vw" h="100vh" justifyContent={"center"} alignItems={"center"}>
    <Box w={'50%'}>
      <Auth
        appearance={{ theme: ThemeSupa }}
        providers={['google']}
        supabaseClient={supabase}
      />
    </Box>
    </Flex>
  );
};

export default LogIn;
