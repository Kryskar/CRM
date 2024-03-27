import * as Yup from 'yup';

const MIN_REQUESTED_AMOUNT = 10000
const MAX_REQUESTED_AMOUNT = 10000000

const nameValidation = Yup.string().required('Name is required');
const surnameValidation = Yup.string().required('Surname is required');
const phoneNumberValidation = Yup.string()
  .matches(/^\d+$/, 'Phone number must contain only digits')
  .required('Phone number is required');
const adressValidation = Yup.string().required('Address is required');
const requestAmountValidation = Yup.number()
  .typeError('Requested amount must be a number')
  .required('Requested amount is required')
  .positive('Requested amount must be positive')
  .min(MIN_REQUESTED_AMOUNT, "amount must be at least 10000")
  .max(MAX_REQUESTED_AMOUNT, "amount can't be higher then 10000000");

export const validationAddClientSchema = Yup.object().shape({
  name: nameValidation,
  surname: surnameValidation,
  phoneNumber: phoneNumberValidation,
  address: adressValidation,
  requestedAmount: requestAmountValidation,
});
