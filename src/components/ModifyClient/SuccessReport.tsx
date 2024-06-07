import { ChangeEvent, useEffect, useState } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { useFormik } from 'formik';

import { NewClient } from '../../api/mutations/Clients/useAddClientToSupabase';
import { SuccessReportObj, useReportSuccess } from '../../api/mutations/Finalized/useReportSuccess';
import { firstWordCharToUppercase, POLISH_BANKS } from '../../constants/constants';
import { useTourContext } from '../../contexts/TourProvider';
import { useGetSession } from '../../hooks/useGetSession';
import { validationSuccessReport } from '../../schemas/validations';

const SuccessReport = ({ data }: { data: NewClient }) => {
  const { decodedData } = useGetSession();
  const { name, phoneNumber, requestedAmount, surname } = data;
  const { reportSuccess } = useReportSuccess(data);
  const [selectValue, setSelectValue] = useState("")
 const {stepIndex} = useTourContext()


  const formik = useFormik({
    initialValues: {
      clientName: name,
      clientSurname: surname,
      clientPhoneNumber: phoneNumber,
      loanAmount: requestedAmount,
      intrest: '',
      commission: '',
      loanPeriod: '',
      bank: '',
      agentEmail: '',
    },
    onSubmit: (values: SuccessReportObj) => {
      reportSuccess(values);
    },
    validationSchema: validationSuccessReport,
  });

  const handleSelectChange = (e:ChangeEvent<HTMLSelectElement>) => {
  formik.handleChange(e)
  setSelectValue(e.target.value)
  }

  useEffect(() => {
    if (decodedData) {
      formik.setFieldValue('agentEmail', decodedData.email);
    }
  }, [decodedData]); //eslint-disable-line

  useEffect(() => {
    if (stepIndex === 30) { //eslint-disable-line
      const randomBank = POLISH_BANKS[Math.floor(Math.random() * 12)] //eslint-disable-line
      formik.setValues({
        clientName: name,
        clientSurname: surname,
        clientPhoneNumber: phoneNumber,
        loanAmount: requestedAmount,
        intrest: '10',
        commission: '5',
        loanPeriod: '120',
        bank: randomBank,
        agentEmail: decodedData
? decodedData.user_metadata.email
: "",
      })
      setSelectValue(randomBank)
    }
    
    if (stepIndex === 31) { //eslint-disable-line
      formik.submitForm()
    }
  }, [stepIndex]); //eslint-disable-line

  const fragmentOfValuesKeys = Object.keys(validationSuccessReport.fields).filter(
    (el) => el !== 'bank',
  );

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: '30px', width: '90%' }}
      onSubmit={formik.handleSubmit}
    >
      <FormControl isInvalid={formik.touched.bank && !!formik.errors.bank} variant='floating'>
        <Select name='bank' value={selectValue} onBlur={formik.handleBlur} onChange={handleSelectChange}>
          <option value=''>Select a bank</option>
          {POLISH_BANKS.map((bank) => (
            <option key={bank} value={bank}>
              {bank}
            </option>
          ))}
        </Select>
        <FormLabel>Select bank</FormLabel>
        <FormErrorMessage>{formik.errors.bank}</FormErrorMessage>
      </FormControl>
      <Flex gap={'15px'}>
        {fragmentOfValuesKeys.map((key) => (
          <Flex key={key}>
            <FormControl
              variant='floating'
              isInvalid={
                formik.touched[key as keyof typeof formik.touched] &&
                !!formik.errors[key as keyof typeof formik.errors]
              }
            >
              <Input
                name={key}
                placeholder=' '
                value={formik.values[key as keyof typeof formik.values]}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              <FormLabel>
                {key === 'loanPeriod'
? 'Period'
: firstWordCharToUppercase(key)}
              </FormLabel>
              <FormErrorMessage>
                {formik.errors[key as keyof typeof formik.errors]}
              </FormErrorMessage>
            </FormControl>
          </Flex>
        ))}
      </Flex>

      <Button type={'submit'}>submit report</Button>
    </form>
  );
};

export default SuccessReport;
