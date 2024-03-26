import { useState } from 'react';
import { Checkbox, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import { CreatableSelect } from 'chakra-react-select';

import { FILTERED_STATUSES_ARR, STATUSES } from '../../constants/constants';

interface SelectValues {
  label: string;
  value: string;
}

const ModifyClientRestOfForm = ({ formik }: { formik: any }) => { //eslint-disable-line
   

  const [selectedCheckbox, setSelectedCheckbox] = useState('');
  const [status, setStatus] = useState<SelectValues | undefined>();

  const handleCheckboxChange = (value: string) => {
    setSelectedCheckbox(value);
    if (value === 'chance') {
      formik.setFieldValue('chance', true);
    } else if (value === 'notDoable') {
      formik.setFieldValue('chance', false);
      formik.setFieldValue('clientStatus', STATUSES.notDoable);
      formik.setFieldValue('nextContactDate', '');
    }
  };
  const handleSelectChange = (value: SelectValues) => {
    setStatus(value);
    formik.setFieldValue('clientStatus', value.value);
  };

  return (
    <>
      <Stack direction='row' spacing={5}>
        <Checkbox
          colorScheme='green'
          isChecked={selectedCheckbox === 'chance'}
          name='chance'
          value={formik.values.chance}
          onChange={() => handleCheckboxChange('chance')}
        >
          Chance
        </Checkbox>
        <Checkbox
          colorScheme='red'
          isChecked={selectedCheckbox === 'notDoable'}
          name='notDoable'
          onChange={() => handleCheckboxChange('notDoable')}
        >
          Not Doable
        </Checkbox>
      </Stack>
      <FormControl variant='floating'>
        <Input
          name='comment'
          placeholder=' '
          value={formik.values.comment}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <FormLabel>Comment</FormLabel>
      </FormControl>
      {selectedCheckbox === 'chance' && (
        <>
          <FormControl id='place' variant='floating'>
            <CreatableSelect
              openMenuOnFocus
              classNamePrefix='chakra-react-select'
              name='clientStatus'
              options={FILTERED_STATUSES_ARR}
              placeholder=' '
              chakraStyles={{
                menu: (provided) => ({
                  ...provided,
                  zIndex: 3,
                }),
              }}
              onBlur={formik.handleBlur} //eslint-disable-line
              value={status}
              // tabSelectsValues
              onChange={(value) => (value ? handleSelectChange(value) : '')} //eslint-disable-line
            />
            <FormLabel>Select status</FormLabel>
          </FormControl>
          <FormControl variant='floating'>
            <Input
              name='nextContactDate'
              placeholder=' '
              type='datetime-local'
              value={formik.values.nextContactDate}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <FormLabel>Next Contact Date</FormLabel>
          </FormControl>
        </>
      )}
    </>
  );
};

export default ModifyClientRestOfForm;
