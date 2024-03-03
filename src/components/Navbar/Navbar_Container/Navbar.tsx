import { Avatar, Flex, Text } from '@chakra-ui/react';

import { useGetSession } from '../../../hooks/useGetSession';
import LogOut from '../Navbar_Items/LogOut';
import NavbarIconList from '../Navbar_Items/NavbarIconList';
import ThemeSwitcher from '../Navbar_Items/ThemeSwitcher';

const Navbar = () => {
  const { decodedData } = useGetSession();
  return (
    <Flex
      alignItems='center'
      bgColor='secondaryColor'
      color={'fontColor'}
      gap={'10px'}
      h={'100%'}
      justifyContent={'center'}
      pr='20px'
    >
      <NavbarIconList />
      <Flex alignItems={'center'} gap={'20px'} position={'absolute'} right={5} top={3}>
        <ThemeSwitcher />
        <Avatar
          transform={'translateY(-6px)'}
          src={decodedData
? decodedData.user_metadata.picture
: ''}
        />
        <Text fontWeight={'700'}>{decodedData
? decodedData.user_metadata.email
: ''}</Text>
        <LogOut />
      </Flex>
    </Flex>
  );
};

export default Navbar;
