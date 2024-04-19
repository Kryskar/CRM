import { MdDarkMode, MdLightMode } from 'react-icons/md';
import {  Flex, Icon, Switch } from '@chakra-ui/react';

import { useThemeContext } from '../../../contexts/ThemeProvider';

const ThemeSwitcher = () => {
  const { isDarkMode, setIsDarkMode } = useThemeContext();

  const handleChange = () => {
    setIsDarkMode(!isDarkMode);
    // const styleEl = document.createElement('style');
    // const cssText = document.createTextNode(
    //   'html * { transition: color, background-color 0.1s ease-out!important }',
    // );
    // styleEl.appendChild(cssText);
    // document.head.appendChild(styleEl);
    // setTimeout(() => {
    //   document.head.removeChild(styleEl);
    // }, 300);
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
