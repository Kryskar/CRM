import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useFormik } from 'formik';

import { useAddClientToSupabase } from '../../../api/mutations/Clients/useAddClientToSupabase';
import { useEditClient } from '../../../api/mutations/Clients/useEditClient';
import { ROUTES } from '../../../constants/routes';
import { validationAddClientSchema } from '../../../schemas/validations';
import ModifyClientRestOfForm from '../../ModifyClient/ModifyClientRestOfForm';
import { getFormLabels, initialValues } from '../AddClient_Items/addClientHelpers';

export interface NewClient {
  addedTime: string;
  address: string;
  chance:string;
  clientStatus?: string;
  comment:string;
  googleCalendarEventId?:string;
  id: string;
  name: string;
  nextContactDate:string;
  phoneNumber: string;
  requestedAmount: string | number;
  surname: string;
  updated_at?:string
}

const  AddClient_Container = ({
  data = null,
  onClose,
}: {
  data: NewClient | null;
  onClose?: () => void;
}) => {
  const { addClient } = useAddClientToSupabase();
  const { editClient } = useEditClient();
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(ROUTES.home);
  };
  
  const modifyClientSubmit = (values:NewClient) => {
   
    if (data && onClose) {
      const id = data.id;
      editClient({ id, editedData: values });
      onClose();
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      if (!data) {
        const addClientValues: Pick<NewClient, 'name' | 'surname' | 'phoneNumber' | 'address' | 'requestedAmount'> = {
              name: values.name,
              surname: values.surname,
              phoneNumber: values.phoneNumber,
              address: values.address,
              requestedAmount: values.requestedAmount,
        }
        
        addClient(addClientValues);
      } else if (data) {
        modifyClientSubmit(values);
      }
    },

    validationSchema: validationAddClientSchema,
  });

  const updateFormValues = () => {
    if (data) {
      const updatedFormValues = {
        id: data.id,
        name: data.name,
        surname: data.surname,
        phoneNumber: data.phoneNumber,
        address: data.address,
        requestedAmount: data.requestedAmount,
        addedTime: data.addedTime,
        chance: '',
        comment: '',
        clientStatus: '',
        nextContactDate: '',
      };
      formik.setValues(updatedFormValues);
    }
  };

  useEffect(() => {
    if (data) {
      updateFormValues();
    }
  }, [data]); //eslint-disable-line

  const { errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values } = formik;
  const addClientKeys = ['name', 'surname', 'phoneNumber', 'address', 'requestedAmount'];
  
  return (
    <>
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '30px', width: '90%' }}
        onSubmit={handleSubmit}
      >
        {Object.keys(values)
          .filter((key) => addClientKeys.includes(key))
          .map((formKey) => (
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

        {data && (
          <>
            <ModifyClientRestOfForm formik={formik} />
            <Button type='submit'>Proceed</Button>
          </>
        )}
        {!data && (
          <Flex justifyContent={'space-between'}>
            <Button onClick={handleBackClick}>Back</Button>
            <Button disabled={isSubmitting} type='submit'>
              Submit
            </Button>
          </Flex>
        )}
      </form>
    </>
  );
};

export default AddClient_Container;
