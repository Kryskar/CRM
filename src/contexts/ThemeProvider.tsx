import React, { createContext, useContext, useState } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { buttonTheme } from './components/button';

interface ThContext {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeContext = createContext<ThContext | null>(null);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const darkMode = {
    primaryColor: '#222831',
    secondaryColor: '#393E46',
    tertiaryColor: '#00ADB5',
    fontColor: '#EEEEEE',
  };

  const lightMode = {
    primaryColor: '#fafafa',
    secondaryColor: '#e4e5f1',
    tertiaryColor: '#d2d3db',
    fontColor: '#484b6a',
  };

  const theme = extendTheme({
    colors: isDarkMode ? darkMode : lightMode,
    components: {
      Button: buttonTheme,
    },
  });

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      <ChakraProvider resetCSS={true} theme={theme}>
        {children}
      </ChakraProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('something is wrong wrap element in ThemeProvider');
  }
  return ctx;
};
