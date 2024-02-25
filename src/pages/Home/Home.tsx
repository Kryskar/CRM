import { Outlet, useLocation } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';

import ContentBox from '../../components/ContentBox/ContentBox_Container/ContentBox';
import Navbar from '../../components/Navbar/Navbar_Container/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar_Container/Sidebar';


const Home = () => {
  const { pathname } = useLocation();
  
  return (
    <Flex direction={'column'} gap={'10px'} h={'100vh'}>
      <Box h='60px'>
        <Navbar />
      </Box>
      {pathname === '/' && (
        <Flex gap={'10px'} h={'90%'}>
          <Sidebar />
          <ContentBox />
        </Flex>
      )}
      <Outlet />
    </Flex>
  );
};

export default Home;
