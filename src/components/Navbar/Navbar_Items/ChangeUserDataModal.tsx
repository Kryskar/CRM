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
  const {updateUser} = useUpdateUser()
  // const queryClient = useQueryClient()

  const { handleBlur, handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      fullName: fullName,
      picture: picture,
    },
    onSubmit: async (values) => {
    updateUser({values,email})
    // queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.getUsers] });
    onClose()
    },
  });

  // useEffect(()=>{resetForm()},[isOpen])

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>change user display data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel htmlFor='email'>email:</FormLabel>
                <Input disabled id='email' value={email} />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor='fullName'>full name:</FormLabel>
                <Input
                  id='fullName'
                  value={values.fullName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor='picture'>picture:</FormLabel>
                <Input
                id='picture'
                  mb="30px"
                  value={values.picture}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </FormControl>
              <Flex alignItems={'center'} flexDir={'column'} mb="50px" w={'100%'}>
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
