import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';


const ChangeStatusModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
//   const { session } = useGetSession();

//   const {
//     formik: {
//       handleChange,
//       handleSubmit,
//       values: { end, start, title },
//     },
//     handleDeleteClick,
//     handleEditClick,
//   } = useEditOrDeleteEvent(session, event, setMode, onClose);

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>modal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form >
              <FormControl>
                {(
                  <>
                    <FormLabel>event title:</FormLabel>
                    <Input id='title' 
                    // value={title} onChange={handleChange} 
                    />
                  </>
                )}
                <FormLabel>start event:</FormLabel>
                <Input
                //   disabled={mode !== 'edit'}
                  id='start'
                //   max={end}
                  type='datetime-local'
                //   value={start}
                //   onChange={handleChange}
                />
                <FormLabel>end event:</FormLabel>
                <Input
                //   disabled={mode !== 'edit'}
                  id='end'
                  mb='20px'
                //   min={start}
                  type='datetime-local'
                //   value={end}
                //   onChange={handleChange}
                />
              </FormControl>
              
                <Button colorScheme='yellow' marginLeft='auto' type='submit'>
                  Change Status
                </Button>
             
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangeStatusModal;
