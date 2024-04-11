import { useEffect, useState } from 'react';
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

import {
  NewClient,
  useAddClientToSupabase,
} from '../../../api/mutations/Clients/useAddClientToSupabase';
import { useEditClient } from '../../../api/mutations/Clients/useEditClient';
import { STATUSES } from '../../../constants/constants';
import { ROUTES } from '../../../constants/routes';
import { useSessionContext } from '../../../contexts/SessionProvider';
import {
  validationAddClientSchema,
  validationUpdateClientSchema,
  validationUpdateClientSchemaChance,
} from '../../../schemas/validations';
import ModifyClientRestOfForm from '../../ModifyClient/ModifyClientRestOfForm';
import {
  createAddClientValuesObj,
  createUpdatedFormValuesObj,
  getFormLabels,
  initialValues,
} from '../AddClient_Items/addClientHelpers';

const AddClient_Container = ({
  data = null,
  onClose,
}: {
  data: NewClient | null;
  onClose?: () => void;
}) => {
  const {email} = useSessionContext()
  const [selectedCheckbox, setSelectedCheckbox] = useState('');
  const { addClient } = useAddClientToSupabase();
  const { editClient } = useEditClient();
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(ROUTES.home);
  };

  const modifyClientSubmit = (values: NewClient) => {
    if (data && onClose) {
      const id = data.id;
      const modifiedValues = { ...values, agentEmail: email };
      editClient({ id, editedData: modifiedValues });
      onClose();
    }
  };

  const getValidationSchema = (data: NewClient | null, selectedCheckbox: string) => {
    if (!data) {
      return validationAddClientSchema;
    }
    if (selectedCheckbox === STATUSES.chance) {
      return validationUpdateClientSchemaChance;
    }
    return validationUpdateClientSchema;
  };

  const formik = useFormik<NewClient>({
    initialValues: initialValues,
    onSubmit: (values) => {
      if (!data) {
        const addClientValues = createAddClientValuesObj(values);
        addClient(addClientValues);
      } else if (data) {
        modifyClientSubmit(values);
      }
    },

    validationSchema: getValidationSchema(data, selectedCheckbox),
  });

  const updateFormValues = () => {
    if (data) {
      const updatedFormValues = createUpdatedFormValuesObj(data);
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
            <ModifyClientRestOfForm
              chanceCheckboxProps={{ selectedCheckbox, setSelectedCheckbox }}
              formik={formik}
            />
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
