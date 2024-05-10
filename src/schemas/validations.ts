import * as Yup from 'yup';

const MIN_REQUESTED_AMOUNT = 10000;
const MAX_REQUESTED_AMOUNT = 10000000;

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
  .min(MIN_REQUESTED_AMOUNT, 'amount must be at least 10000')
  .max(MAX_REQUESTED_AMOUNT, "amount can't be higher then 10000000");
const chanceValidation = Yup.bool().required('One checkbox selection is required');
const commentValidation = Yup.string().required('Comment is required');
const statusValidation = Yup.string().required('Status is required');
const nextContactDate = Yup.string().required('Next Contact Date is required');
const positiveNumberFieldIsRequired = Yup.number()
  .positive('number must be positive')
  .required('field is required');
const bankValidation = Yup.string().required('Bank is required');

const addClientValidations = {
  name: nameValidation,
  surname: surnameValidation,
  phoneNumber: phoneNumberValidation,
  address: adressValidation,
  requestedAmount: requestAmountValidation,
};

const updateClientValidations = {
  ...addClientValidations,
  chance: chanceValidation,
  comment: commentValidation,
};

const updateClientValidationsChance = {
  ...updateClientValidations,
  clientStatus: statusValidation,
  nextContactDate: nextContactDate,
};

const successReportValidations = {
  intrest: positiveNumberFieldIsRequired,
  commission: positiveNumberFieldIsRequired,
  loanPeriod: positiveNumberFieldIsRequired,
  bank: bankValidation,
};

export const validationAddClientSchema = Yup.object().shape(addClientValidations);
export const validationUpdateClientSchema = Yup.object().shape(updateClientValidations);
export const validationUpdateClientSchemaChance = Yup.object().shape(updateClientValidationsChance);
export const validationSuccessReport = Yup.object().shape(successReportValidations);
