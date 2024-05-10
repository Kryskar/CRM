import { NewClient } from '../../../api/mutations/Clients/useAddClientToSupabase';
import { firstWordCharToUppercase } from '../../../constants/constants';

export const initialValues: NewClient = {
  id: '',
  name: '',
  surname: '',
  phoneNumber: '',
  address: '',
  requestedAmount: '',
  addedTime: '',
  clientStatus: '',
  comment: '',
  chance: '',
  nextContactDate: '',
  googleCalendarEventId: '',
};

export const getFormLabels = (data: string) => {
  switch (data) {
    case 'phoneNumber':
      return 'Phone number';
    case 'requestedAmount':
      return 'Requested loan amount';
    default:
      return firstWordCharToUppercase(data);
  }
};

export const createAddClientValuesObj = (values: NewClient) => {
  const addClientValues: Pick<
    NewClient,
    'name' | 'surname' | 'phoneNumber' | 'address' | 'requestedAmount'
  > = {
    name: values.name,
    surname: values.surname,
    phoneNumber: values.phoneNumber,
    address: values.address,
    requestedAmount: values.requestedAmount,
  };
  return addClientValues;
};

export const createUpdatedFormValuesObj = (data: NewClient) => {
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
  return updatedFormValues;
};
