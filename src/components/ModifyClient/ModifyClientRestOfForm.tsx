import { ChangeEvent } from 'react';
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
import { FILTERED_STATUSES_ARR, STATUSES } from '../../constants/constants';
import { useThemeContext } from '../../contexts/ThemeProvider';

type chanceCheckboxPropsTypes = {
  selectedCheckbox: string;
  setSelectedCheckbox: React.Dispatch<React.SetStateAction<string>>;
};

const ModifyClientRestOfForm = ({
  chanceCheckboxProps,
  formik,
}: {
  chanceCheckboxProps: chanceCheckboxPropsTypes;
  formik: FormikProps<NewClient>;
}) => {
  const { selectedCheckbox, setSelectedCheckbox } = chanceCheckboxProps;
  const { CONDITIONAL_OPTION_THEME } = useThemeContext();
  // const [status, setStatus] = useState<SelectValues | undefined>();

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
    formik.setFieldValue('clientStatus', e.target.value);
  };

  return (
    <>
      <FormControl isInvalid={formik.touched.chance && !!formik.errors.chance}>
        <Stack direction='row' spacing={5}>
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
      {selectedCheckbox === 'chance' && (
        <>
          <FormControl
            id='clientStatus'
            isInvalid={formik.touched.clientStatus && !!formik.errors.clientStatus}
            variant='floating'
          >
            <Select
              name='clientStatus'
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
          {/* {formik.values.clientStatus !== STATUSES.loanFinalized &&  */}
          <FormControl
            isInvalid={formik.touched.nextContactDate && !!formik.errors.nextContactDate}
            variant='floating'
          >
            <Input
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
          {/* } */}
        </>
      )}
      {/* {formik.values.clientStatus === STATUSES.loanFinalized && <SuccessReport formik={formik}/>} */}
    </>
  );
};

export default ModifyClientRestOfForm;
