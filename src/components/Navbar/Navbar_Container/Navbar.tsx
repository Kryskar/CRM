import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Flex, Text } from '@chakra-ui/react';

import { ROUTES } from '../../../constants/routes';
import { useGetSession } from '../../../hooks/useGetSession';
import LogOut from '../Navbar_Items/LogOut';
import NavbarIconList from '../Navbar_Items/NavbarIconList';
import ThemeSwitcher from '../Navbar_Items/ThemeSwitcher';

const Navbar = () => {
  const { decodedData } = useGetSession();
  const navigate = useNavigate()
  const handleAddClientClick = () => {
    navigate(ROUTES.addClient)
  }
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
      <Flex alignItems={'center'} gap={'20px'} left={5} position={'absolute'} top={3}>
        <Button onClick={handleAddClientClick}>Add Client</Button>
      </Flex>
      <NavbarIconList />
      <Flex alignItems={'center'} gap={'20px'} position={'absolute'} right={5} top={3}>
        <ThemeSwitcher />
        <Avatar
          referrerPolicy={'no-referrer'} // added this because sometimes images wasn't displayed properly
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
