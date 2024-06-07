import { FaPersonCirclePlus } from 'react-icons/fa6';
import { useLocation, useNavigate } from 'react-router-dom';
import { InfoIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Flex, Text, Tooltip, useDisclosure } from '@chakra-ui/react';

import { randomGeneratedNumber, randomGuideTourClientData } from '../../../constants/constants';
import { ROUTES } from '../../../constants/routes';
import { useSessionContext } from '../../../contexts/SessionProvider';
import { useTourContext } from '../../../contexts/TourProvider';
import ChangeUserDataModal from '../Navbar_Items/ChangeUserDataModal';
import LogOut from '../Navbar_Items/LogOut';
import NavbarIconList, { CustomIcon } from '../Navbar_Items/NavbarIconList';
import ThemeSwitcher from '../Navbar_Items/ThemeSwitcher';

const Navbar = () => {
  const {setRandomAddClientData, setRandomNum, startTour} = useTourContext()
  const { loggedInUserDbData } = useSessionContext();
  const navigate = useNavigate();
  const {pathname} = useLocation()
  const handleAddClientClick = () => {
    navigate(ROUTES.addClient);
  };
  const { email, picture } = loggedInUserDbData;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const handleTourIconClick = () => {
    startTour()
    setRandomNum(randomGeneratedNumber)
    setRandomAddClientData(randomGuideTourClientData)
  }
  return (
    <>
      <Flex alignItems='center'
        bgColor='secondaryColor'
        className='step4 step7 step18 step24 step32 step35 step39'
        color={'fontColor'}
        flexDirection={{ base: 'column', md: 'row' }}
        gap={'10px'}
        h={'100%'}
        justifyContent={'space-between'}
        px='10px'
        py='5px'
        w={'100%'}
      >
        <Flex justifyContent={'space-between'} pr='20px' w='100%'>
          <Flex alignItems={'center'} gap={'20px'}>
            <Button
            className='step3'
              ml={{ base: 0, lg: '20px' }}
              size={{ base: 'sm', md: 'md' }}
              variant='defined'
              onClick={handleAddClientClick}
            >
              <Flex alignItems={'center'} gap='10px'>
                Add client <FaPersonCirclePlus fontSize={'20px'} />
              </Flex>
            </Button>
          </Flex>
          <NavbarIconList display={{ base: 'none', md: 'flex', lg: 'flex' }} />
          <Flex alignItems={'center'} gap={{ base: '5px', sm: '20px' }}>
            <ThemeSwitcher />
            <Avatar
              referrerPolicy={'no-referrer'} // added this because sometimes images wasn't displayed properly
              rel='noreferrer'
              size={{ base: 'sm', md: 'md', lg: 'md' }}
              src={picture}
              onClick={onOpen}
            />
            <ChangeUserDataModal data={loggedInUserDbData} isOpen={isOpen} onClose={onClose} />
            <Text
              display={{ base: 'none', md: 'none', lg: 'block' }}
              fontSize={{ lg: '13px' }}
              fontWeight={'700'}
            >
              {email}
            </Text>
            <Box display={pathname==="/"
? ""
: "none"}>
            <Tooltip
              hasArrow
              borderRadius={'md'}
              fontSize={'sm'}
              label={'Tour guide'}
              placeContent={'bottom'} 
            >
              <CustomIcon>
                <InfoIcon boxSize={'20px'} className='step1' _hover={{
                    color: 'analyticsBlue',
                    cursor: 'pointer',
                  }}
                  
                  onClick={handleTourIconClick}
                />
              </CustomIcon>
            </Tooltip>
            </Box>
            <LogOut variant={'defined'} />
          </Flex>
        </Flex>
        <NavbarIconList display={{ base: 'flex', md: 'none', lg: 'none' }} />
      </Flex>
    </>
  );
};

export default Navbar;
