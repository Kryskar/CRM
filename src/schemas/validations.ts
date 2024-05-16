import { addYears, subMonths } from 'date-fns';
import * as Yup from 'yup';

import { minutesDifference,TWO_WEEKS_IN_MINUTES } from '../constants/constants';

const MIN_REQUESTED_AMOUNT = 10000;
const MAX_REQUESTED_AMOUNT = 10000000;

const nameValidation = Yup.string().required('Name is required');
const surnameValidation = Yup.string().required('Surname is required');
const phoneNumberValidation = Yup.string()
  .matches(/^\(\+\d{2}\) \d{9}$/, 'Phone number must match the format (+99) 999999999')
  .required('Phone number is required');
const adressValidation = Yup.string().required('Address is required');
const requestAmountValidation = Yup.number()
  .typeError('Requested amount must be a number')
  .required('Requested amount is required')
  .positive('Requested amount must be positive')
  .min(MIN_REQUESTED_AMOUNT, 'Amount must be at least 10000')
  .max(MAX_REQUESTED_AMOUNT, "Amount can't be higher then 10000000");
const chanceValidation = Yup.bool().required('One checkbox selection is required');
const commentValidation = Yup.string().required('Comment is required');
const statusValidation = Yup.string().required('Status is required');
const nextContactDate = Yup.string().required('Next Contact Date is required');
const positiveNumberFieldIsRequired = Yup.number()
  .positive('Number must be positive')
  .required('Field is required');
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

export const calendarEditEventValidations = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  start: Yup.date()
    .required('Start Date is required')
    .min(subMonths(new Date(), 1), 'Start Date cannot be earlier than a month ago')
    .max(addYears(new Date(), 1), 'Start Date cannot be more than one year from now'),
  end: Yup.date()
    .required('End Date is required')
    .min(subMonths(new Date(), 1), 'End Date cannot be earlier than a month ago')
    .max(addYears(new Date(), 1), 'End Date cannot be more than one year from now')
    .test(
      'length-of-event',
      "Event can't be longer than 2 weeks",
      function(value) {
        const start = this.parent.start; 
        const end = value; 
        const startEndTimeDifference = minutesDifference(end, start) 
        return startEndTimeDifference <= TWO_WEEKS_IN_MINUTES
      }
    )
    .test(
      'end-after-start',
      'End Date must be set after Start Date',
      function(value) {
        const start = new Date(this.parent.start); 
        const end = new Date(value); 
        return end > start;
      }
    ),
});

export const validationAddClientSchema = Yup.object().shape(addClientValidations);
export const validationUpdateClientSchema = Yup.object().shape(updateClientValidations);
export const validationUpdateClientSchemaChance = Yup.object().shape(updateClientValidationsChance);
export const validationSuccessReport = Yup.object().shape(successReportValidations);
