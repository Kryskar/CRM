import InputMask from 'react-input-mask';
import { chakra,FormControl, FormErrorMessage, FormLabel, Input, InputProps } from "@chakra-ui/react";
import { FormikProps } from "formik";

import { NewClient } from "../../../api/mutations/Clients/useAddClientToSupabase";

import { getFormLabels } from "./addClientHelpers";

interface FloatingLabelInputProps {
    as?: React.ElementType | typeof InputMask;
    formKey: string;
    formik: FormikProps<NewClient>;
    mask?: string | (string | RegExp)[];
    rest?: Omit<InputProps, 'value' | 'onChange' | 'onBlur'>;
  }
  
  export const FloatingLabelInput = ({
    as = Input,
    formik,
    formKey,
    mask,
    ...rest
  }: FloatingLabelInputProps) => {
    const { errors, handleBlur, handleChange, touched, values } = formik;
    return (
      <FormControl
        key={formKey}
        isRequired
        variant='floating'
        isInvalid={
          touched[formKey as keyof typeof errors] && !!errors[formKey as keyof typeof errors]
        }
      >
        <Input
          as={as}
          errorBorderColor='analyticsRed'
          mask={mask}
          name={formKey}
          placeholder=''
          value={values[formKey as keyof typeof values]}
          onBlur={handleBlur}
          onChange={handleChange}
          {...rest}
        />
        <FormLabel requiredIndicator={<chakra.span color={'analyticsRed'}> *</chakra.span>}>
          {getFormLabels(formKey)}
        </FormLabel>
        <FormErrorMessage color={'analyticsRed'}>
          {errors[formKey as keyof typeof errors]}
        </FormErrorMessage>
      </FormControl>
    );
  };