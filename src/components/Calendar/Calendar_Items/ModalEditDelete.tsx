import { useState } from 'react';
import { Event } from 'react-big-calendar';
import {
  Button,
  FormControl,
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
      handleChange,
      handleSubmit,
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
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>{mode === 'edit'
? 'edit event'
: event?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl>
                {mode === 'edit' && (
                  <>
                    <FormLabel>event title:</FormLabel>
                    <Input id='title' value={title} onChange={handleChange} />
                  </>
                )}
                <FormLabel>start event:</FormLabel>
                <Input
                  disabled={mode !== 'edit'}
                  id='start'
                  max={end}
                  type='datetime-local'
                  value={start}
                  onChange={handleChange}
                />
                <FormLabel>end event:</FormLabel>
                <Input
                  disabled={mode !== 'edit'}
                  id='end'
                  mb='20px'
                  min={start}
                  type='datetime-local'
                  value={end}
                  onChange={handleChange}
                />
              </FormControl>
              {mode == 'edit' && (
                <Button colorScheme='green' marginLeft='auto' type='submit'>
                  Confirm Edit
                </Button>
              )}
            </form>
          </ModalBody>

          <ModalFooter gap={'15px'}>
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
