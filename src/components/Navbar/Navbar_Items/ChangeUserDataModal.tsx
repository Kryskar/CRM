import { useEffect, useState } from 'react';
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
import { validationChangeUserData } from '../../../schemas/validations';

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
  const [formSubmitted, setFormSubmitted] = useState(false);
  const initialValues = {
    fullName: fullName,
    picture: picture,
  };
  const formik = useFormik<ChangeUserDisplayData>({
    initialValues: initialValues,
    onSubmit: async (values) => {
      updateUser({ values, email });
      setFormSubmitted(true);
      onClose();
    },
    validationSchema: validationChangeUserData,
  });

  const { handleSubmit, values } = formik;
  useEffect(() => {
    if (!isOpen && !formSubmitted) {
      formik.resetForm({ values: initialValues });
    } else if (!isOpen && formSubmitted) {
      setFormSubmitted(false);
    }
  }, [isOpen, formSubmitted]); //eslint-disable-line
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay bgColor={'modalOverlayColor'} />

        <ModalContent>
          <ModalHeader bgColor={'primaryColor'} color='fontColor'>
            Change user display data
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody bgColor={'primaryColor'} color='fontColor'>
            <form
              style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              onSubmit={handleSubmit}
            >
              <FormControl>
                <FormLabel htmlFor='email'>Email:</FormLabel>
                <Input disabled id='email' value={email} />
              </FormControl>

              <FormInput
                display='Full name:'
                formik={formik}
                name={'fullName'}
                value={values.fullName}
              />
              <FormInput
                formik={formik}
                name={'picture'}
                value={values.picture}
                display='
                Picture:'
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
