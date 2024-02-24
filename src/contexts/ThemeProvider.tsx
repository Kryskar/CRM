import React, { createContext, useContext, useState } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { buttonTheme } from '../theme/components/button';
import { iconTheme } from '../theme/iconButton';
import { DARK_MODE, LIGHT_MODE } from '../constrants/theme';

interface ThContext {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeContext = createContext<ThContext | null>(null);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = extendTheme({
    colors: isDarkMode ? DARK_MODE : LIGHT_MODE,
    components: {
      Button: buttonTheme,
      IconButton: iconTheme,
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
