import { SlotInfo } from 'react-big-calendar';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from '@chakra-ui/react';
import { formatDate } from 'date-fns';
import { useFormik } from 'formik';

import { DATE_FORMATS } from '../../../constants/constants';
import { getAddEventValidations } from '../../../schemas/validations';
import { useAddNewEvent } from '../hooks/useAddNewEvent';

export interface AddEventValues {
  end: string;
  start: string;
  title: string;
}

const AddEventModalPart = ({
  handleClose,
  selectedSlot,
}: {
  handleClose: () => void;
  selectedSlot: SlotInfo;
}) => {
  const { handleAddNewEvent } = useAddNewEvent();
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    values: { end, start, title },
  } = useFormik({
    initialValues: {
      title: '',
      start: '09:00',
      end: '17:00',
    },
    onSubmit: (values) => {
      handleAddNewEvent(values, selectedSlot);
      handleClose();
    },
    validationSchema: getAddEventValidations().calendarAddClientValidations,
  });
  return (
    <ModalContent>
      {' '}
      <ModalHeader bgColor={'primaryColor'} color='fontColor'>
        Add event
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody bgColor={'primaryColor'} color='fontColor'>
        <form onSubmit={handleSubmit}>
          <FormControl mb='20px'>
            <FormLabel>Event date:</FormLabel>
            <Input disabled type='date' value={formatDate(selectedSlot.start, DATE_FORMATS.date)} />
          </FormControl>
          <FormControl isInvalid={touched.title && !!errors.title} mb='20px'>
            <FormLabel>Event title:</FormLabel>
            <Input name='title' value={title} onBlur={handleBlur} onChange={handleChange} />
            <FormErrorMessage color={'analyticsRed'} mb='5px'>
              {errors.title}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={touched.start && !!errors.start} mb='20px'>
            <FormLabel>Event start:</FormLabel>
            <Input
              name='start'
              type='time'
              value={start}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <FormErrorMessage color={'analyticsRed'} mb='5px'>
              {errors.start}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={touched.end && !!errors.end} mb='20px'>
            <FormLabel>Event end:</FormLabel>
            <Input name='end' type='time' value={end} onBlur={handleBlur} onChange={handleChange} />
            <FormErrorMessage color={'analyticsRed'} mb='5px'>
              {errors.end}
            </FormErrorMessage>
          </FormControl>
          <Flex>
            <Button colorScheme='green' marginLeft={'auto'} my='20px' type='submit'>
              Add Event
            </Button>
          </Flex>
        </form>
      </ModalBody>
    </ModalContent>
  );
};

export default AddEventModalPart;
