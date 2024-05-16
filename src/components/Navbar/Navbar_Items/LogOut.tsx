import { IoIosLogOut } from "react-icons/io";
import { Button, ButtonProps, Flex } from '@chakra-ui/react';

import { supabase } from '../../../database/supabase';

const LogOut = ({...props}:ButtonProps) => {
  const handleClick = () => {
    supabase.auth.signOut();
  };
  return (
    <Button size={{ base: 'sm', md: 'md', lg: 'md' }} onClick={handleClick} {...props}>
      <Flex alignItems={"center"} gap="10px">
      Sign out
      <IoIosLogOut fontSize={"20px"} />
      </Flex>
    </Button>
  );
};

export default LogOut;
