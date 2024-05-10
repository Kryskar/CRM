import {
  Avatar,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useFormik } from 'formik';

import { UserSupabase } from '../../../api/mutations/Users/useAddUserToSupabase';
import { useUpdateUser } from '../../../api/mutations/Users/useUpdateUser';

import { FormInput } from './ChangeUserDataHelpers';

export interface ChangeUserDisplayData {
  fullName: string;
  picture: string;
}

const ChangeUserDataModal = ({
  data,
  isOpen,
  onClose,
}: {
  data: UserSupabase;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { email, fullName, picture } = data;
  const handleClose = () => {
    onClose();
  };
  const { updateUser } = useUpdateUser();

  const formik = useFormik<ChangeUserDisplayData>({
    initialValues: {
      fullName: fullName,
      picture: picture,
    },
    onSubmit: async (values) => {
      updateUser({ values, email });
      onClose();
    },
  });

  const { handleSubmit, values } = formik;

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay bgColor={'modalOverlayColor'} />

        <ModalContent>
          <ModalHeader bgColor={'primaryColor'} color='fontColor'>
            change user display data
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody bgColor={'primaryColor'} color='fontColor'>
            <form
              style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              onSubmit={handleSubmit}
            >
              <FormControl>
                <FormLabel htmlFor='email'>email:</FormLabel>
                <Input disabled id='email' value={email} />
              </FormControl>

              <FormInput
                display='full name:'
                formik={formik}
                name={'fullName'}
                value={values.fullName}
              />
              <FormInput
                display='picture:'
                formik={formik}
                name={'picture'}
                value={values.picture}
              />

              <Flex alignItems={'center'} flexDir={'column'} mb='50px' w={'100%'}>
                <Text fontSize={'10px'}>Preview Picture</Text>
                <Avatar size={'2xl'} src={values.picture} />
              </Flex>

              <Button colorScheme='yellow' marginLeft='auto' mb='20px' type='submit'>
                Change Data
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangeUserDataModal;
