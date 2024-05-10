import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

import BoardBox from '../../components/BoardBox/BoardBox_Container/BoardBox';
import Navbar from '../../components/Navbar/Navbar_Container/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar_Container/Sidebar';
import TaskBoard from '../../components/TaskBoard/Taskboard_Container/TaskBoard';
import { useCheckDbForUser } from '../../hooks/useCheckDbForClient';
import { useGetSession } from '../../hooks/useGetSession';

const Home = () => {
  const { decodedData } = useGetSession();

  const { syncDbData } = useCheckDbForUser();
  const { pathname } = useLocation();

  useEffect(() => {
    syncDbData(); // sync used for updating user in supabase table when new user logs in
  }, [decodedData]); //eslint-disable-line

  return (
    <Flex
      bgColor={'primaryColor'}
      color={'fontColor'}
      direction={'column'}
      gap={'50px'}
      minH={'100vh'}
      w={'100vw'}
    >
      <Navbar />
      {pathname === '/' && (
        <Flex
          alignItems={{ base: 'center', md: 'center', lg: 'flex-start', xl: 'flex-start' }}
          flexDirection={{ base: 'column', md: 'row', lg: 'row' }}
          gap={{ base: '30px', md: '30px', lg: '0px' }}
          h={'90%'}
          justifyContent={'space-between'}
        >
          <Sidebar
            order={{ base: 2, md: 2, lg: 0 }}
            w={{ base: '300px', md: '400px', lg: '20%' }}
          />
          <BoardBox
            display={{ base: 'none', md: 'none', lg: 'flex' }}
            w={{ base: '300px', md: '400px', lg: '55%' }}
          />
          <TaskBoard
            order={{ base: 1, md: 1, lg: 0 }}
            w={{ base: '300px', md: '400px', lg: '20%' }}
          />
        </Flex>
      )}
      <Outlet />
    </Flex>
  );
};

export default Home;
