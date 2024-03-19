import { useNavigate } from 'react-router-dom';
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { useFormik } from 'formik';

import { useAddClientToSupabase } from '../../api/mutations/Clients/useAddClientToSupabase';
import { ROUTES } from '../../constants/routes';
import { validationAddClientSchema } from '../../schemas/validations';

export interface NewClient {
  addedTime: string;
  address: string;
  clientStatus?: string;
  id: string;
  name: string;
  phoneNumber: string;
  requestedAmount: number | string;
  surname: string;
}

const AddClient = () => {
  const { addClient } = useAddClientToSupabase();
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(ROUTES.home);
  };

  const { errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values } =
    useFormik({
      initialValues: {
        name: '',
        surname: '',
        phoneNumber: '',
        address: '',
        requestedAmount: '',
      },
      onSubmit: (values: Omit<NewClient, 'id' | 'addedTime' | 'clientStatus'>) => addClient(values),
      validationSchema: validationAddClientSchema,
    });

  //TODO: move to helpers
  const firstWordCharToUppercase = (word: string) => {
    const FIRST_CHAR_INDEX = 0;
    const INDEX_OF_THE_BEGINNING = 1;
    return word.charAt(FIRST_CHAR_INDEX).toUpperCase() + word.slice(INDEX_OF_THE_BEGINNING);
  };

  const getFormLabels = (data: string) => {
    switch (data) {
      case 'phoneNumber':
        return 'Phone number';
      case 'requestedAmount':
        return 'Requested loan amount';
      default:
        return firstWordCharToUppercase(data);
    }
  };

  return (
    <Flex alignItems={'center'} h={'100vh'} justifyContent={'center'} w={'100vw'}>
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '30px', width: '40%' }}
        onSubmit={handleSubmit}
      >
        {Object.keys(values).map((formKey) => (
          <FormControl
            key={formKey}
            isRequired
            variant='floating'
            isInvalid={
              touched[formKey as keyof typeof errors] && !!errors[formKey as keyof typeof errors]
            }
          >
            <Input
              name={formKey}
              placeholder=''
              value={values[formKey as keyof typeof values]}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <FormLabel>{getFormLabels(formKey)}</FormLabel>
            <FormErrorMessage>{errors[formKey as keyof typeof errors]}</FormErrorMessage>
          </FormControl>
        ))}

        <Flex justifyContent={'space-between'}>
          <Button onClick={handleBackClick}>Back</Button>
          <Button disabled={isSubmitting} type='submit'>
            Submit
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default AddClient;
