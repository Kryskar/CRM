import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';

import { ROUTES } from '../../../constants/routes';
import { useSessionContext } from '../../../contexts/SessionProvider';
import ChangeUserDataModal from '../Navbar_Items/ChangeUserDataModal';
import LogOut from '../Navbar_Items/LogOut';
import NavbarIconList from '../Navbar_Items/NavbarIconList';
import ThemeSwitcher from '../Navbar_Items/ThemeSwitcher';

const Navbar = () => {
  const { loggedInUserDbData } = useSessionContext();
  const navigate = useNavigate();
  const handleAddClientClick = () => {
    navigate(ROUTES.addClient);
  };
  const { email, picture} = loggedInUserDbData;
  const { isOpen, onClose, onOpen } = useDisclosure();

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
          src={picture}
          transform={'translateY(-6px)'}
          onClick={onOpen}
        />
        <ChangeUserDataModal
          data={loggedInUserDbData}
          isOpen={isOpen}
          onClose={onClose}
        />
        <Text fontWeight={'700'}>{email}</Text>
        <LogOut />
      </Flex>
    </Flex>
  );
};

export default Navbar;
