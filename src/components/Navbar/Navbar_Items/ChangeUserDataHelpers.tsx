import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { FormikProps } from 'formik';

import { ChangeUserDisplayData } from './ChangeUserDataModal';

export const FormInput = ({
  display,
  formik,
  name,
  value,
}: {
  display: string;
  formik: FormikProps<ChangeUserDisplayData>;
  name: string;
  value: string;
}) => {
  const { errors, handleBlur, handleChange, touched } = formik;

  return (
    <FormControl
      isInvalid={touched[name as keyof typeof errors] && !!errors[name as keyof typeof errors]}
    >
      <FormLabel htmlFor={name}>{display}</FormLabel>
      <Input id={name} value={value} onBlur={handleBlur} onChange={handleChange} />
      <FormErrorMessage color={'analyticsRed'} mb='5px'>
        {errors[name as keyof typeof errors]}
      </FormErrorMessage>
    </FormControl>
  );
};
