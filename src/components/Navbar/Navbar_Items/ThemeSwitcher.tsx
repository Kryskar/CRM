import { MdDarkMode, MdLightMode } from 'react-icons/md';
import {  Flex, Icon, Switch } from '@chakra-ui/react';

import { useThemeContext } from '../../../contexts/ThemeProvider';

const ThemeSwitcher = () => {
  const { isDarkMode, setIsDarkMode } = useThemeContext();

  const handleChange = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <Flex alignItems={"center"}>
      <Switch boxSize={10}  colorScheme='gray' size='md' style={{display:"flex", alignItems:"center"}} onChange={handleChange} />
      <Icon boxSize={8} as={isDarkMode
? MdDarkMode
: MdLightMode} />
    </Flex>
  );
};

export default ThemeSwitcher;
