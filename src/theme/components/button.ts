import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const Button = defineStyle({
  py: 3,
  px: 5,
  backgroundColor: 'buttonColor',
  color: 'fontColor',
  border: "1px",
  _active: {
    backgroundColor: 'buttonActiveColor'
  },
  _hover: {backgroundColor:'buttonHoverColor'},
});

// const redButton=defineStyle({
//     ...blueButton,

// })

const variants = {
  defined: Button,
};

export const buttonTheme = defineStyleConfig({
  variants,
});
