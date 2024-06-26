import { useEffect, useState } from 'react';
import { Event, SlotInfo } from 'react-big-calendar';
import {
  Button,
  chakra,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

import { DATE_FORMATS, getDateForTour } from '../../../constants/constants';
import { useTourContext } from '../../../contexts/TourProvider';
import { useGetSession } from '../../../hooks/useGetSession';
import { splitString } from '../../TaskBoard/Taskboard_Items/taskBoardHelpers';
import { useEditOrDeleteEvent } from '../hooks/useEditOrDeleteEvent';

import AddEventModalPart from './AddEventModalPart';

const ModalEditDelete = ({
  event,
  isOpen,
  onClose,
  selectedSlot = null,
  setSelectedSlot,
}: {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  selectedSlot: SlotInfo | null;
  setSelectedSlot: React.Dispatch<React.SetStateAction<SlotInfo | null>>;
}) => {
  const [mode, setMode] = useState('');
  const { stepIndex } = useTourContext();
  const { session } = useGetSession();
  const { formik, handleDeleteClick, handleEditClick } = useEditOrDeleteEvent(
    session,
    event,
    setMode,
    onClose,
  );
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    values: { end, start, title },
  } = formik;
  const handleClose = () => {
    onClose();
    setMode('');
    setSelectedSlot(null);
  };
  /* eslint-disable */
  useEffect(() => {
    if (stepIndex === 20) {
      handleEditClick();
    }
    if (stepIndex === 21) {
      formik.setValues({
        title: '#EDIT TEST# ' + title,
        start: getDateForTour(
          new Date(),
          DATE_FORMATS.forNextContactDateInput,
          7,
        ),
        end: getDateForTour(
          new Date(),
          DATE_FORMATS.forNextContactDateInput,
          7,
          2,
        ), //
      });
    }
    if (stepIndex === 22) {
      formik.submitForm();
    }
  }, [stepIndex]);
  /* eslint-enable*/
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay bgColor={'modalOverlayColor'} />
        {selectedSlot && (
          <AddEventModalPart handleClose={handleClose} selectedSlot={selectedSlot} />
        )}
        {!selectedSlot && (
          <ModalContent className='step20 step21'>
            <ModalHeader bgColor={'primaryColor'} color='fontColor'>
              {mode === 'edit'
? (
                'Edit event'
              )
: (
                <Flex flexDirection='column' gap='20px'>
                  <chakra.span color='linkColor' fontWeight={800}>
                    {event && event.title && typeof event.title === 'string'
                      ? splitString(event.title).title
                      : ''}
                  </chakra.span>
                  <chakra.span>
                    {event && event.title && typeof event.title === 'string'
                      ? splitString(event.title).rest
                      : ''}
                  </chakra.span>
                </Flex>
              )}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody bgColor={'primaryColor'} color='fontColor'>
              <form onSubmit={handleSubmit}>
                {mode === 'edit' && (
                  <>
                    <FormControl isInvalid={touched.title && !!errors.title} mb='20px'>
                      <FormLabel>Event title:</FormLabel>
                      <Input id='title' value={title} onBlur={handleBlur} onChange={handleChange} />
                      <FormErrorMessage color={'analyticsRed'} mb='5px'>
                        {errors.title}
                      </FormErrorMessage>
                    </FormControl>
                  </>
                )}
                <FormControl isInvalid={touched.start && !!errors.start} mb='20px'>
                  <FormLabel>Start event:</FormLabel>
                  <Input
                    disabled={mode !== 'edit'}
                    id='start'
                    max={end}
                    type='datetime-local'
                    value={start}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <FormErrorMessage color={'analyticsRed'} mb='5px'>
                    {errors.start}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={touched.end && !!errors.end} mb='20px'>
                  <FormLabel>End event:</FormLabel>
                  <Input
                    disabled={mode !== 'edit'}
                    id='end'
                    min={start}
                    type='datetime-local'
                    value={end}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <FormErrorMessage color={'analyticsRed'} mb='5px'>
                    {errors.end}
                  </FormErrorMessage>
                </FormControl>
                {mode == 'edit' && (
                  <Flex>
                    <Button
                      className='step22'
                      colorScheme='green'
                      justifySelf={'center'}
                      marginLeft='auto'
                      mt='40px'
                      type='submit'
                    >
                      Confirm Edit
                    </Button>
                  </Flex>
                )}
              </form>
            </ModalBody>

            <ModalFooter bgColor={'primaryColor'} color='fontColor' gap={'15px'}>
              {!mode
? (
                <>
                  <Button colorScheme='yellow' onClick={handleEditClick}>
                    Edit
                  </Button>
                  <Button colorScheme='blue' onClick={() => setMode('delete')}>
                    Delete
                  </Button>
                </>
              )
: mode === 'delete'
? (
                <>
                  <Text fontSize={'xs'}>are you sure you want to delete event ?</Text>
                  <Button colorScheme='red' onClick={handleDeleteClick}>
                    Confirm Delete
                  </Button>
                </>
              )
: (
                <></>
              )}
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </>
  );
};

export default ModalEditDelete;
