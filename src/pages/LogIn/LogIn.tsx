import { useState } from 'react';
import { FaLock, FaUser } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import {
  Button,
  chakra,
  Divider,
  Flex,
  FormControl,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';

import { BOX_SHADOW } from '../../constants/theme';
import { emailSignIn } from '../../hooks/emailSignIn';
import { googleSignIn } from '../../hooks/googleSignIn';

const CFaUserAlt = chakra(FaUser);
const CFaLock = chakra(FaLock);

const LogIn = () => {
  const [isShownPassword, setIsShownPassword] = useState(true);
  const [email, setEmail] = useState('mycrmtestuser@gmail.com');
  const [password, setPassword] = useState('CrmTest123');

  const handleShowClick = () => setIsShownPassword(!isShownPassword);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await emailSignIn(email, password);
  };
  return (
    <Flex
      alignItems={'center'}
      bgColor={'secondaryColor'}
      h='100vh'
      justifyContent={'center'}
      w='100vw'
    >
      <Flex
        alignItems={'center'}
        bgColor={'primaryColor'}
        borderRadius={'10px'}
        boxShadow={BOX_SHADOW}
        flexDirection={'column'}
        gap='50px'
        p='50px'
      >
        <Text fontSize={'35px'} fontWeight={'600'}>
          CRM
        </Text>
        <Img src='https://cdn-icons-png.flaticon.com/512/6295/6295417.png' w='150px' />
        <form onSubmit={handleSubmit}>
          <Stack p='1rem' spacing={4}>
            <FormControl>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  {' '}
                  <CFaUserAlt color='gray.500' />
                </InputLeftElement>
                <Input
                  disabled
                  required
                  placeholder='Login'
                  pointerEvents={'none'}
                  type='email'
                  value={email} //presentation
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <CFaLock color='gray.500' />
                </InputLeftElement>
                <Input
                  disabled
                  required
                  placeholder='Password'
                  pointerEvents={'none'}
                  value={password} //presentation
                  type={isShownPassword
? 'text'
: 'password'}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width='2.5rem'>
                  {isShownPassword
? (
                    <FiEye onClick={handleShowClick} />
                  )
: (
                    <FiEyeOff onClick={handleShowClick} />
                  )}
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Tooltip hasArrow label='Demo version' placement='right'>
              <Button borderRadius={5} type='submit' width='full'>
                Sign in
              </Button>
            </Tooltip>
            <Divider />
            <Tooltip hasArrow label='Full version' placement='right'>
              <Button onClick={googleSignIn}>
                <Flex alignItems={'center'} gap='10px'>
                  <FcGoogle />
                  <chakra.span>
                    Sign In with<chakra.span fontWeight={'700'}> Google</chakra.span>
                  </chakra.span>
                </Flex>
              </Button>
            </Tooltip>
          </Stack>
        </form>
      </Flex>
    </Flex>
  );
};

export default LogIn;
