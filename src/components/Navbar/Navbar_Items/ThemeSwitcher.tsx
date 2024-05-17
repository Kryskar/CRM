import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { Flex, Icon, Switch } from '@chakra-ui/react';

import { useThemeContext } from '../../../contexts/ThemeProvider';

const ThemeSwitcher = () => {
  const { isDarkMode, setIsDarkMode } = useThemeContext();

  const handleChange = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <Flex alignItems={'center'} gap="5px">
      <Switch
        colorScheme='gray'
        size={{ base: 'sm', md: 'md', lg: 'md' }}
        style={{ display: 'flex', alignItems: 'center' }}
        onChange={handleChange}
      />
      <Icon boxSize={{ base: 6, md: 8 }} as={isDarkMode
? MdDarkMode
: MdLightMode} />
    </Flex>
  );
};

export default ThemeSwitcher;
