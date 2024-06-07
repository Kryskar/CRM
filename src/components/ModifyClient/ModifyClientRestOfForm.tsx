import { ChangeEvent, useEffect } from 'react';
import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
} from '@chakra-ui/react';
import { FormikProps } from 'formik';

import { NewClient } from '../../api/mutations/Clients/useAddClientToSupabase';
import { DATE_FORMATS, FILTERED_STATUSES_ARR, getFirstWorkingDayAfterTwoDays,STATUSES } from '../../constants/constants';
import { useThemeContext } from '../../contexts/ThemeProvider';
import { useTourContext } from '../../contexts/TourProvider';

type chanceCheckboxPropsTypes = {
  selectedCheckbox: string;
  setSelectedCheckbox: React.Dispatch<React.SetStateAction<string>>;
};

type chanceSelectPropsTypes = {
  selectValue: string; 
  setSelectValue: React.Dispatch<React.SetStateAction<string>>
};

const ModifyClientRestOfForm = ({
  chanceCheckboxProps,
  chanceSelectProps,
  formik
}: {
  chanceCheckboxProps: chanceCheckboxPropsTypes;
  chanceSelectProps: chanceSelectPropsTypes;
  formik: FormikProps<NewClient>;
}) => {
  
  const { randomAddClientData, randomNum, stepIndex } = useTourContext();
  const { selectedCheckbox, setSelectedCheckbox } = chanceCheckboxProps;
  const { selectValue, setSelectValue} = chanceSelectProps
  const { CONDITIONAL_OPTION_THEME } = useThemeContext();

  const handleCheckboxChange = (value: string) => {
    setSelectedCheckbox(value);
    if (value === 'chance') {
      formik.setFieldValue('chance', true);
      formik.setFieldValue('clientStatus', STATUSES.chance);
    } else if (value === 'notDoable') {
      formik.setFieldValue('chance', false);
      formik.setFieldValue('clientStatus', STATUSES.notDoable);
      formik.setFieldValue('nextContactDate', '');
    }
  };
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
    formik.setFieldValue('clientStatus', e.target.value);
  };

  const TourValuesStep13 = {
    ...randomAddClientData,
    chance: true,
    comment: 'waiting for documents, call to client in 3 days ' + randomNum,
    clientStatus: STATUSES.waitingForDocuments,
    nextContactDate:  getFirstWorkingDayAfterTwoDays(new Date(),DATE_FORMATS.forNextContactDateInput),
  };


  useEffect(() => {
    if (stepIndex === 12) { //eslint-disable-line
      handleCheckboxChange('chance');
      formik.setValues(TourValuesStep13);
      setSelectValue(STATUSES.waitingForDocuments);
    }
    if (stepIndex === 26) { //eslint-disable-line
      handleCheckboxChange('chance');
      formik.setValues({
        ...TourValuesStep13,
        clientStatus: STATUSES.loanFinalized,
        comment: 'loan finalized',
      });
      setSelectValue(STATUSES.loanFinalized);
    }
    if (stepIndex === 14 || stepIndex === 27) { //eslint-disable-line
      formik.submitForm();
    }
  }, [stepIndex]); //eslint-disable-line

  useEffect(() => {
    if(selectValue===STATUSES.loanFinalized){
      formik.setFieldValue("nextContactDate", getFirstWorkingDayAfterTwoDays(new Date(),DATE_FORMATS.forNextContactDateInput))
    }
  },[selectValue]) //eslint-disable-line

  return (
    <>
      <FormControl isInvalid={formik.touched.chance && !!formik.errors.chance}>
        <Stack className='step12' direction='row' spacing={5}>
          <Checkbox
            isChecked={selectedCheckbox === 'chance'}
            name='chance'
            sx={{ '[data-invalid]': { borderColor: 'analyticsRed' } }}
            value={formik.values.chance}
            variant={'circular'}
            onBlur={formik.handleBlur}
            onChange={() => handleCheckboxChange('chance')}
          >
            Chance
          </Checkbox>
          <Checkbox
            id='chance'
            isChecked={selectedCheckbox === 'notDoable'}
            sx={{ '[data-invalid]': { borderColor: 'analyticsRed' } }}
            onBlur={formik.handleBlur}
            onChange={() => handleCheckboxChange('notDoable')}
          >
            Not Doable
          </Checkbox>
        </Stack>
        <FormErrorMessage color={'analyticsRed'}>{formik.errors.chance}</FormErrorMessage>
      </FormControl>
      
      {selectedCheckbox === 'chance' && (
        <>
          <FormControl
            id='clientStatus'
            isInvalid={formik.touched.clientStatus && !!formik.errors.clientStatus}
            variant='floating'
          >
            <Select
              name='clientStatus'
              value={selectValue}
              onBlur={formik.handleBlur}
              onChange={(e) => handleSelectChange(e)}
            >
              {FILTERED_STATUSES_ARR.map((obj) => (
                <option key={obj.value} style={CONDITIONAL_OPTION_THEME} value={obj.value}>
                  {obj.label}
                </option>
              ))}
            </Select>
            <FormLabel>Select status</FormLabel>
            <FormErrorMessage color={'analyticsRed'}>{formik.errors.clientStatus}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={formik.touched.nextContactDate && !!formik.errors.nextContactDate}
            variant='floating'
          >
            <Input
            disabled={selectValue===STATUSES.loanFinalized}
              name='nextContactDate'
              placeholder=' '
              type='datetime-local'
              value={formik.values.nextContactDate}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <FormLabel>Next Contact Date</FormLabel>
            <FormErrorMessage color={'analyticsRed'}>
              {formik.errors.nextContactDate}
            </FormErrorMessage>
          </FormControl>
        </>
      )}
      <FormControl isInvalid={formik.touched.comment && !!formik.errors.comment} variant='floating'>
        <Input
          name='comment'
          placeholder=' '
          value={formik.values.comment}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <FormLabel>Comment</FormLabel>
        <FormErrorMessage color={'analyticsRed'}>{formik.errors.comment}</FormErrorMessage>
      </FormControl>
    </>
  );
};

export default ModifyClientRestOfForm;
