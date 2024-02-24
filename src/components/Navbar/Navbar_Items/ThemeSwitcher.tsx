import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { Box, Icon, Switch } from '@chakra-ui/react';

import { useThemeContext } from '../../../contexts/ThemeProvider';

const ThemeSwitcher = () => {
  const { isDarkMode, setIsDarkMode } = useThemeContext();

  const handleChange = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <Box>
      <Switch boxSize={10} colorScheme='gray' size='md' onChange={handleChange} />
      <Icon boxSize={8} as={isDarkMode ? MdDarkMode : MdLightMode} />
    </Box>
  );
};

export default ThemeSwitcher;
