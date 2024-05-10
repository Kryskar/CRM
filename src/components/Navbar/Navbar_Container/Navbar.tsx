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
  const { email, picture } = loggedInUserDbData;
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Flex
        // display ={{ base: 'none', md: 'flex'}}
        alignItems='center'
        bgColor='secondaryColor'
        color={'fontColor'}
        flexDirection={{ base: 'column', md: 'row', lg: 'row' }}
        gap={'10px'}
        h={'100%'}
        justifyContent={'space-between'}
        pr='20px'
        py='5px'
      >
        <Flex justifyContent={'space-between'} w='100vw'>
          <Flex alignItems={'center'} gap={'20px'}>
            <Button
              ml='20px'
              size={{ base: 'sm', md: 'md', lg: 'md' }}
              onClick={handleAddClientClick}
            >
              Add Client
            </Button>
          </Flex>
          <NavbarIconList display={{ base: 'none', md: 'flex', lg: 'flex' }} />
          <Flex alignItems={'center'} gap={'20px'}>
            <ThemeSwitcher />
            <Avatar
              referrerPolicy={'no-referrer'} // added this because sometimes images wasn't displayed properly
              rel='noreferrer'
              size={{ base: 'sm', md: 'md', lg: 'md' }}
              src={picture}
              onClick={onOpen}
            />
            <ChangeUserDataModal data={loggedInUserDbData} isOpen={isOpen} onClose={onClose} />
            <Text display={{ base: 'none', md: 'none', lg: 'block' }} fontWeight={'700'}>
              {email}
            </Text>
            <LogOut />
          </Flex>
        </Flex>
        <NavbarIconList display={{ base: 'flex', md: 'none', lg: 'none' }} />
      </Flex>
    </>
  );
};

export default Navbar;
