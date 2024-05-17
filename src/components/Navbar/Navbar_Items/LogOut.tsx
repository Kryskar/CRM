import { IoIosLogOut } from "react-icons/io";
import { Button, ButtonProps, Flex } from '@chakra-ui/react';

import { supabase } from '../../../database/supabase';

const LogOut = ({...props}:ButtonProps) => {
  const handleClick = () => {
    supabase.auth.signOut();
  };
  return (
    <Button size={{ base: 'sm', md: 'md' }} onClick={handleClick} {...props}>
      <Flex alignItems={"center"} gap={{base: "5px", md: "10px"}}>
      Sign out
      <IoIosLogOut fontSize={"15px"} />
      </Flex>
    </Button>
  );
};

export default LogOut;
