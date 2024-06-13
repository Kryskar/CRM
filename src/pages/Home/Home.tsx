import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {  Flex, useBreakpointValue } from '@chakra-ui/react';

import BoardBox from '../../components/BoardBox/BoardBox_Container/BoardBox';
import Navbar from '../../components/Navbar/Navbar_Container/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar_Container/Sidebar';
import TaskBoard from '../../components/TaskBoard/Taskboard_Container/TaskBoard';
import { TOUR_STATUS_KEY } from '../../constants/constants';
import { useTourContext } from '../../contexts/TourProvider';
import { useCheckDbForUser } from '../../hooks/useCheckDbForClient';
import { useGetSession } from '../../hooks/useGetSession';

// import Footer from '../../components/Footer/Footer';

const Home = () => {
  const { decodedData } = useGetSession();
  const { syncDbData } = useCheckDbForUser();
  const { pathname } = useLocation();
  const { setRun } = useTourContext();
  useEffect(() => {
    syncDbData(); // sync used for updating user in supabase table when new user logs in
  }, [decodedData]); //eslint-disable-line

  const isAtLeastMediumDevice = useBreakpointValue({ base: false, md: true });
  useEffect(() => {
    if (isAtLeastMediumDevice) {
      const tourStatus = localStorage.getItem(TOUR_STATUS_KEY);
      if (!tourStatus) {
        setRun(true);
      }
    }
  }, [isAtLeastMediumDevice]); //eslint-disable-line
  
  return (
    <Flex
      alignItems={{ base: 'center', lg: 'initial', '2xl': 'center' }}
      bgColor={'primaryColor'}
      color={'fontColor'}
      direction={'column'}
      gap={'50px'}
      minH={'100vh'}
      w={'100vw'}
    >
      <Navbar />
      
      {pathname === '/' && (
        <>
          <Flex
            alignItems={{ base: 'center', md: 'flex-start' }}
            className='step2'
            flexDirection={{ base: 'column', md: 'row' }}
            gap={{ base: '30px', lg: '0px' }}
            justifyContent={'space-between'}
            mb={{ base: '20px', md: '0px' }}
            w={{ base: '350px', md: '700px', lg: '100vw', '2xl': '1440px' }}
          >
            <Sidebar order={{ base: 2, lg: 0 }} w={{ base: '300px', md: '400px', lg: '20%' }} />
            <BoardBox
              display={{ base: 'flex', md: 'none', lg: 'flex' }}
              order={{ base: 3, md: 0 }}
              w={{ base: '300px', md: '400px', lg: '55%' }}
            />
            <TaskBoard order={{ base: 1, lg: 0 }} w={{ base: '300px', md: '400px', lg: '20%' }} />
          </Flex>
          <BoardBox
            alignSelf={'center'}
            display={{ base: 'none', md: 'flex', lg: 'none' }}
            w={{ md: '700px' }}
          />
        </>
      )}
      <Outlet />
      {/* <Footer/> */}
    </Flex>
  );
};

export default Home;
