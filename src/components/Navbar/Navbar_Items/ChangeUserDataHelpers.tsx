import { FormControl, FormLabel, Input } from '@chakra-ui/react';
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
  const { handleBlur, handleChange } = formik;
  return (
    <FormControl>
      <FormLabel htmlFor={name}>{display}</FormLabel>
      <Input id={name} value={value} onBlur={handleBlur} onChange={handleChange} />
    </FormControl>
  );
};
