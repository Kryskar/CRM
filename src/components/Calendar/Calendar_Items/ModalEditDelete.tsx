import { useState } from 'react';
import { Event } from 'react-big-calendar';
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

import { useGetSession } from '../../../hooks/useGetSession';
import { splitString } from '../../TaskBoard/Taskboard_Items/taskBoardHelpers';
import { useEditOrDeleteEvent } from '../hooks/useEditOrDeleteEvent';

const ModalEditDelete = ({
  event,
  isOpen,
  onClose,
}: {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [mode, setMode] = useState('');

  const { session } = useGetSession();
  const {
    formik: {
      errors,
      handleBlur,
      handleChange,
      handleSubmit,
      touched,
      values: { end, start, title },
    },
    handleDeleteClick,
    handleEditClick,
  } = useEditOrDeleteEvent(session, event, setMode, onClose);

  const handleClose = () => {
    onClose();
    setMode('');
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay bgColor={'modalOverlayColor'} />

        <ModalContent>
          <ModalHeader bgColor={'primaryColor'} color='fontColor'>
            {mode === 'edit'
? (
              'edit event'
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
                  <FormControl isInvalid={touched.title && !!errors.title}>
                    <FormLabel>Event title:</FormLabel>
                    <Input id='title' value={title} onBlur={handleBlur} onChange={handleChange} />
                    <FormErrorMessage color={'analyticsRed'} mb='5px'>
                      {errors.title}
                    </FormErrorMessage>
                  </FormControl>
                </>
              )}
              <FormControl isInvalid={touched.start && !!errors.start}>
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
              <FormControl isInvalid={touched.end && !!errors.end}>
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
                <Button colorScheme='green' marginLeft='auto' mt='20px' type='submit'>
                  Confirm Edit
                </Button>
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
      </Modal>
    </>
  );
};

export default ModalEditDelete;
