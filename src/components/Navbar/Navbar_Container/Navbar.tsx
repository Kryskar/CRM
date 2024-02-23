import { Flex } from '@chakra-ui/react';

import LogOut from '../Navbar_Items/LogOut';
import NavbarIconList from '../Navbar_Items/NavbarIconList';
import ThemeSwitcher from '../Navbar_Items/ThemeSwitcher';

const Navbar = () => {
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
      <Flex gap={'20px'} position={'absolute'} right={5} top={3}>
        <ThemeSwitcher />
        <LogOut />
      </Flex>
    </Flex>
  );
};

export default Navbar;
