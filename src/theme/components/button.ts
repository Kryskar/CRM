import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const blueButton = defineStyle({
  py: 3,
  px: 5,
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
  backgroundColor: 'secondaryColor',
  _active: {
    color: 'tertiaryColor',
  },
  _hover: {},
});

// const redButton=defineStyle({
//     ...blueButton,

// })

const variants = {
  blue: blueButton,
};

export const buttonTheme = defineStyleConfig({
  variants,
});
