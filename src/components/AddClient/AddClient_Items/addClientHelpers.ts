import { NewClient } from "../AddClient_Container/AddClient_Contaier";

export const initialValues : NewClient = {
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
}

const firstWordCharToUppercase = (word: string) => {
    const FIRST_CHAR_INDEX = 0;
    const INDEX_OF_THE_BEGINNING = 1;
    return word.charAt(FIRST_CHAR_INDEX).toUpperCase() + word.slice(INDEX_OF_THE_BEGINNING);
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

