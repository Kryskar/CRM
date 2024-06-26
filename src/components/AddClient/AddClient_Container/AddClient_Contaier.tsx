import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIcon, CheckIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
} from '@chakra-ui/react';
import {  useFormik } from 'formik';

import {
  NewClient,
  useAddClientToSupabase,
} from '../../../api/mutations/Clients/useAddClientToSupabase';
import { useEditClient } from '../../../api/mutations/Clients/useEditClient';
import { STATUSES } from '../../../constants/constants';
import { ROUTES } from '../../../constants/routes';
import { useSessionContext } from '../../../contexts/SessionProvider';
import { useTourContext } from '../../../contexts/TourProvider';
import {
  validationAddClientSchema,
  validationUpdateClientSchema,
  validationUpdateClientSchemaChance,
} from '../../../schemas/validations';
import ModifyClientRestOfForm from '../../ModifyClient/ModifyClientRestOfForm';
import {
  createAddClientValuesObj,
  createUpdatedFormValuesObj,
  initialValues,
} from '../AddClient_Items/addClientHelpers';
import { FloatingLabelInput } from '../AddClient_Items/FloatingLabeLInput';

const AddClient_Container = ({
  data = null,
  onClose,
}: {
  data: NewClient | null;
  onClose?: () => void;
}) => {
  const { randomAddClientData, stepIndex } = useTourContext();
  const { email } = useSessionContext();
  const [selectedCheckbox, setSelectedCheckbox] = useState('');
  const [selectValue, setSelectValue] = useState('');
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
    onSubmit: (values, {resetForm}) => {
      if (!data) {
        const addClientValues = createAddClientValuesObj(values);
        addClient(addClientValues);
        resetForm()
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
  useEffect(() => {
    if (stepIndex === 4) { //eslint-disable-line
      formik.setValues(randomAddClientData);
    }
    if (stepIndex === 5) { //eslint-disable-line
      formik.submitForm()
    }
  }, [stepIndex]); //eslint-disable-line

  const { handleSubmit, isSubmitting, values} = formik;
  const addClientKeys = ['name', 'surname', 'phoneNumber', 'address', 'requestedAmount'];

  return (
    <>
      <form className='step5'
        style={{ display: 'flex', flexDirection: 'column', gap: '30px', width: '90%' }}
        onSubmit={handleSubmit}
      >
        {Object.keys(values)
          .filter((key) => addClientKeys.includes(key))
          .map((formKey) =>
            formKey === 'phoneNumber'
? (
              <FloatingLabelInput
                key={formKey}
                as={InputMask}
                formik={formik}
                formKey='phoneNumber'
                mask='(+99) 999999999'
              />
            )
: (
              <FloatingLabelInput key={formKey} formik={formik} formKey={formKey} />
            ),
          )}
        {data && (
          <>
            <ModifyClientRestOfForm
              chanceCheckboxProps={{ selectedCheckbox, setSelectedCheckbox }}
              chanceSelectProps={{ selectValue, setSelectValue}}
              formik={formik}
            />
            <Button className='step14' mb={'30px'} type='submit'>
              Proceed
            </Button>
          </>
        )}
        {!data && (
          <Flex justifyContent={'space-between'}>
            <Button onClick={handleBackClick}>
              <Flex alignItems={'center'} gap={'10px'}>
                <ArrowBackIcon /> Back{' '}
              </Flex>
            </Button>
            <Button
              bgColor={'analyticsGreen'}
              border={'1px solid'}
              borderColor={'fontColor'}
              disabled={isSubmitting}
              type='submit'
            >
              <Flex alignItems={'center'} gap={'10px'}>
                Submit
                <CheckIcon />
              </Flex>
            </Button>
          </Flex>
        )}
      </form>
    </>
  );
};

export default AddClient_Container;
