import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const blueButton = defineStyle({
  py: 3,
  px: 5,
  border: 'solid 3px blue',
  backgroundColor: 'secondaryColor',
  _active: {
    color: 'tertiaryColor',
  },
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
