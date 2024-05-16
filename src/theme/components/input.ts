import { DARK_MODE, LIGHT_MODE } from "../../constants/theme"


export const InputTheme = (isDarkmode:boolean) => {
  return {
  baseStyle: {
    field: {
       bg: "secondaryColor",
       _autofill: {
         textFillColor: isDarkmode
? DARK_MODE.fontColor
: LIGHT_MODE.fontColor,
         boxShadow: "0 0 0px 1000px secondaryColor inset",
         transition: "background-color 5000s ease-in-out 0s",
       },
    }
 },
  defaultProps: {
    errorBorderColor: 'analyticsRed',
  },
}}

