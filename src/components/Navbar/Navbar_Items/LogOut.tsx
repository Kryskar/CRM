import { Button } from '@chakra-ui/react';

import { supabase } from '../../../database/supabase';

const LogOut = () => {
  const handleClick = () => {
    supabase.auth.signOut();
  };
  return (
    <Button size={{ base: 'sm', md: 'md', lg: 'md' }} onClick={handleClick}>
      Sign out
    </Button>
  );
};

export default LogOut;
