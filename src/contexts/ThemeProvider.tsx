import React, { createContext, useContext, useState } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { DARK_MODE, LIGHT_MODE } from '../constants/theme';
import { buttonTheme } from '../theme/components/button';
import { floatingLabels } from '../theme/components/form';
import {InputTheme } from '../theme/components/input';
import { successToast } from '../theme/components/toast';
import { iconTheme } from '../theme/iconButton';

interface ThContext {
  CONDITIONAL_OPTION_THEME: { backgroundColor: string };
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeContext = createContext<ThContext | null>(null);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const CONDITIONAL_OPTION_THEME = {
    backgroundColor: isDarkMode
? DARK_MODE.primaryColor
: LIGHT_MODE.primaryColor,
  };

  const theme = extendTheme({
    colors: isDarkMode
? DARK_MODE
: LIGHT_MODE,
    components: {
      Button: buttonTheme,
      IconButton: iconTheme,
      Form: floatingLabels,
      Input: InputTheme(isDarkMode),
    },
  });

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode, CONDITIONAL_OPTION_THEME }}>
      <ChakraProvider resetCSS={true} theme={theme} toastOptions={successToast}>
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
