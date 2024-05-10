import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const navIcon = defineStyle({
  border: '2px solid',
  borderColor: 'fontColor',
  borderRadius: '50%',
  boxSize: 12,
  p: '10px',
  _active: {
    bg: 'secondaryColor',
    color: 'fontColor',
  },
  _hover: {
    color: 'secondaryColor',
    backgroundColor: 'fontColor',
    cursor: 'pointer',
  },
});

const variants = {
  nav: navIcon,
};

export const iconTheme = defineStyleConfig({
  variants,
});
